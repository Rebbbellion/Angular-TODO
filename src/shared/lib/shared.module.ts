import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyBlockDirective } from './directives';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    BodyBlockDirective,
  ],
  declarations: [BodyBlockDirective],
})
export class SharedModule {}
