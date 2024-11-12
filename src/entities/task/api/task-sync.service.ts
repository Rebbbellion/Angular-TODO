import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, switchMap, tap } from 'rxjs';
import { Task, TaskStatus } from '../model';
import { FirebaseDataService } from './firebase';
import { IndexedDBService } from './indexedDB';
import { OfflineService, TaskAPIService } from './task-service.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskSyncService {
  private readonly onlineService: TaskAPIService = inject(FirebaseDataService);
  private readonly offlineService: OfflineService = inject(IndexedDBService);

  public syncTasks(): Observable<Task[]> {
    return this.offlineService.getTasks().pipe(
      switchMap((tasks: Task[]) => {
        const sideAction = tap((tasks: Task[]) => {
          tasks.forEach((task: Task) => {
            this.offlineService
              .createTask(task, TaskStatus.Sync)
              .subscribe({ error: () => {} });
          });
        });

        const notSyncedTasks = tasks.filter(
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
                if (task.taskStatus !== TaskStatus.Modified) {
                  this.offlineService.deleteTask(task.apiId).subscribe();
                }
              });
              return this.onlineService.getTasks();
            })
          );
        }
        return this.onlineService.getTasks().pipe(sideAction);
      })
    );
  }
}
