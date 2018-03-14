import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {path: '', loadChildren: './pages/home/home.module#HomeModule'},
  {path: 'login', loadChildren: './pages/login/login.module#LoginModule'},
  {path: 'room', loadChildren: './pages/room/room.module#RoomModule'},
  {path: '**', redirectTo: 'pages/dashboard'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
