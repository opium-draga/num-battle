import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {CoreModule} from "@app/core/core.module";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    CoreModule,
  ],
  providers: [],
  declarations: [LoginComponent]
})
export class LoginModule {
}
