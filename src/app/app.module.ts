import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyOwnCustomMaterialModule } from './app.material.module';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { MomentModule } from 'ngx-moment';

import { RecaptchaModule } from 'ng-recaptcha';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { ShareModule } from '@ngx-share/core';
import { RegistroComponent } from './components/registro/registro.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    HttpClientModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    ShareModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MyOwnCustomMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RecaptchaModule,
    MomentModule
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
