import { Injector, NgModule } from '@angular/core';

@NgModule({})
export class DecoratorModule {
  public static injector: Injector;

  constructor(injector: Injector) {
    DecoratorModule.injector = injector;
  }
}
