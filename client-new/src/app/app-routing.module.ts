import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {GameComponent} from './components/game/game.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'game', component: GameComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
}
