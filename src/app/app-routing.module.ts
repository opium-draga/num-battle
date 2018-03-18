import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from "@app/core/auth/auth-guard.service";


const routes: Routes = [
  {path: '', loadChildren: './pages/home/home.module#HomeModule', canActivate: [AuthGuardService]},
  {path: 'login', loadChildren: './pages/login/login.module#LoginModule'},
  {path: 'room', loadChildren: './pages/room/room.module#RoomModule', canActivate: [AuthGuardService]},
  {path: '**', redirectTo: ''}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
