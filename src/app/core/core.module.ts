import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaterialModule} from "@app/core/material.module";
import {AuthGuardService} from "@app/core/services/auth/auth-guard.service";
import {UserService} from "@app/core/services/user/user.service";
import {environment} from "@env/environment";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {GameService} from "@app/core/services/game/game.service";
import {HeaderComponent} from "@app/core/components/header/header.component";


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    // 3rd party
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,

    // Custom
    MaterialModule,
  ],
  exports: [
    // Angular
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    // 3rd party

    // Custom
    MaterialModule,
    HeaderComponent
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: CoreModule,
      providers: [
        AuthGuardService,
        UserService,
        GameService
      ]
    };
  }
}
