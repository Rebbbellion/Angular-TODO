import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from 'shared/lib';
import { UiModule } from 'shared/ui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseModule } from './firebase';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FirebaseModule, UiModule],
  providers: [provideHttpClient(withInterceptors([AuthInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
