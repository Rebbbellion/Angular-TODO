import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor, URLTransformInterceptor } from 'shared/api';
import { UiModule } from 'shared/ui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseModule } from './firebase';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FirebaseModule, UiModule],
  providers: [
    provideHttpClient(
      withInterceptors([URLTransformInterceptor, AuthInterceptor])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
