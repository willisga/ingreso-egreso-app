// Angular
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CommonModule } from "@angular/common";

// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    RouterModule
  ]

})
export class AuthModule {}
