import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {CoreModule} from "@app/core/core.module";
import {GameFinderPopupComponent} from './game-finder-popup/game-finder-popup.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule
  ],
  declarations: [
    HomeComponent,
    GameFinderPopupComponent
  ],
  entryComponents: [
    GameFinderPopupComponent
  ]
})
export class HomeModule {
}
