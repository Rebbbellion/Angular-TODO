import { inject, InjectionToken } from '@angular/core';
import { TaskService } from '../task-service.interface';
import { FirebaseDataService } from './firebase-data.service';

export const FIREBASE_SERVICE_TOKEN = new InjectionToken<TaskService>(
  'TaskService',
  { factory: () => inject(FirebaseDataService) }
);
