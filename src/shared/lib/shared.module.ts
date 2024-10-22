import { CommonModule } from '@angular/common';
import { inject, Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  exports: [CommonModule, FormsModule, BrowserAnimationsModule],
})
export class SharedModule {
  public static injector: Injector;

  constructor() {
    SharedModule.injector = inject(Injector);
  }
}
