import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { SharedModule } from "./shared/shared.module";
import { authInterceptor } from './auth/interceptors/auth-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
],
  providers: [
    provideHttpClient(
      withInterceptors(  [ authInterceptor ]  )
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
