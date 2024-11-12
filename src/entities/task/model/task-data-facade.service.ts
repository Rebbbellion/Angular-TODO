import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError, timeout } from 'rxjs';
import { TaskAPI, TaskId } from 'shared/api';
import { ConnectivityService } from 'shared/connectivity';
import {
  FirebaseDataService,
  IndexedDBService,
  OfflineService,
  TaskAPIService,
  TaskSyncService,
} from '../api';
import { TaskDataFacade } from './task-data-facade.interface';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskDataFacadeService implements TaskDataFacade {
  private readonly offlineService: OfflineService = inject(IndexedDBService);
  private readonly onlineService: TaskAPIService = inject(FirebaseDataService);

  private readonly taskSyncService: TaskSyncService = inject(TaskSyncService);
  private readonly connectivityService: ConnectivityService =
    inject(ConnectivityService);

  private getRequestObservable<T>(
    onlineObs: Observable<T>,
    offlineObs: Observable<T>,
    sideEffectFn: (arg: T) => void
  ): Observable<T> {
    return this.connectivityService.onlineStatus.getValue()
      ? onlineObs.pipe(
          timeout(3000),
          tap(sideEffectFn),
          catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
              return throwError(() => new Error('You are not authorized'));
            }
            this.connectivityService.onlineStatus.next(false);
            return offlineObs;
          })
        )
      : offlineObs;
  }

  getTasks(): Observable<Task[]> {
    const sideFn = (tasks: Task[]) => {
      this.connectivityService.onlineStatus.next(true);
      tasks.forEach((task: Task) => {
        this.offlineService
          .editTask(task, task.apiId, TaskStatus.Sync)
          .subscribe();
      });
    };

    return this.getRequestObservable(
      this.taskSyncService.syncTasks(),
      this.offlineService.getTasks(),
      sideFn
    );
  }

  createTask(task: TaskAPI): Observable<Task> {
    const sideFn = (taskRes: Task) => {
      this.offlineService.createTask(taskRes, taskRes.taskStatus).subscribe();
    };

    return this.getRequestObservable(
      this.onlineService.createTask(task, TaskStatus.Sync),
      this.offlineService.createTask(task, TaskStatus.New),
      sideFn
    );
  }

  editTask(
    task: TaskAPI,
    apiId: TaskId,
    taskStatus: TaskStatus
  ): Observable<Task> {
    const sideFn = (task: Task) => {
      this.offlineService
        .editTask(task, task.apiId, task.taskStatus)
        .subscribe();
    };

    return this.getRequestObservable(
      this.onlineService.editTask(task, apiId, TaskStatus.Sync),
      this.offlineService.editTask(
        task,
        apiId,
        taskStatus === TaskStatus.Sync ? TaskStatus.Modified : TaskStatus.New
      ),
      sideFn
    );
  }

  deleteTask(apiId: TaskId, taskStatus: TaskStatus): Observable<void> {
    const sideFn = () => this.offlineService.deleteTask(apiId).subscribe();

    return this.getRequestObservable(
      this.onlineService.deleteTask(apiId),
      taskStatus === TaskStatus.New
        ? this.offlineService.deleteTask(apiId)
        : this.offlineService.markAsDeleted(apiId, TaskStatus.Deleted),
      sideFn
    );
  }
}
