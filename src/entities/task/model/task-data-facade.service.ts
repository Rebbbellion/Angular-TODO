import { inject, Injectable } from '@angular/core';
import { first, forkJoin, Observable, of, switchMap } from 'rxjs';
import { TaskAPI, TaskId } from 'shared/api';
import { ConnectivityService } from 'shared/connectivity';
import {
  FirebaseDataService,
  IndexedDBService,
  OfflineService,
  Task,
  TaskAPIService,
  TaskDataService,
  TaskStatus,
} from '../api';

@Injectable({
  providedIn: 'root',
})
export class TaskDataFacadeService implements TaskDataService {
  private readonly connectivityService: ConnectivityService =
    inject(ConnectivityService);
  private readonly offlineService: OfflineService = inject(IndexedDBService);
  private readonly onlineService: TaskAPIService = inject(FirebaseDataService);

  private getRequestObservable<T>(
    offlineObs: Observable<T>,
    onlineObs: Observable<T>
  ): Observable<T> {
    return this.connectivityService.getOnlineStatus().pipe(
      switchMap((isOnline: boolean) => {
        if (isOnline) {
          return this.syncTasks();
        }
        return of(isOnline);
      }),
      switchMap((isOnline: boolean) => (isOnline ? onlineObs : offlineObs))
    );
  }

  private syncTasks(): Observable<boolean> {
    return this.offlineService.getTasks().pipe(
      switchMap((tasks: Task[]) => {
        const notSyncedTasks: Task[] = tasks.filter(
          (task: Task) => task.taskStatus !== TaskStatus.Sync
        );
        if (notSyncedTasks.length > 0) {
          const requests: Observable<Task | void>[] = notSyncedTasks.map(
            ({ apiId, taskStatus, ...taskBody }) => {
              switch (taskStatus) {
                case TaskStatus.New:
                  return this.onlineService.createTask(
                    taskBody,
                    TaskStatus.Sync
                  );
                case TaskStatus.Modified:
                  return this.onlineService.editTask(
                    taskBody,
                    apiId,
                    TaskStatus.Sync
                  );
                default:
                  return this.onlineService.deleteTask(apiId);
              }
            }
          );

          return forkJoin(requests).pipe(
            switchMap(() => {
              notSyncedTasks.forEach((task: Task) => {
                this.offlineService.deleteTask(task.apiId).subscribe();
              });
              return of(true);
            }),
            first()
          );
        }
        return of(true);
      })
    );
  }

  getTasks(): Observable<Task[]> {
    return this.getRequestObservable(
      this.offlineService.getTasks(),
      this.onlineService.getTasks()
    );
  }

  createTask(task: TaskAPI): Observable<Task> {
    return this.getRequestObservable(
      this.offlineService.createTask(task, TaskStatus.New),
      this.onlineService.createTask(task, TaskStatus.Sync)
    );
  }

  editTask(
    task: TaskAPI,
    apiId: TaskId,
    taskStatus: TaskStatus
  ): Observable<Task> {
    return this.getRequestObservable(
      this.offlineService.editTask(
        task,
        apiId,
        taskStatus === TaskStatus.Sync ? TaskStatus.Modified : TaskStatus.New
      ),
      this.onlineService.editTask(task, apiId, TaskStatus.Sync)
    );
  }

  deleteTask(apiId: TaskId, taskStatus: TaskStatus): Observable<void> {
    return this.getRequestObservable(
      taskStatus === TaskStatus.New
        ? this.offlineService.deleteTask(apiId)
        : this.offlineService.markAsDeleted(apiId, TaskStatus.Deleted),
      this.onlineService.deleteTask(apiId)
    );
  }
}
