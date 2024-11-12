import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/lib';
import { UiModule } from 'shared/ui';
import { DeleteTaskComponent } from './ui';

@NgModule({
  declarations: [DeleteTaskComponent],
  imports: [SharedModule, UiModule],
  exports: [DeleteTaskComponent],
})
export class DeleteTaskModule {}
