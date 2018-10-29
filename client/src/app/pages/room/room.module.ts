import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoomRoutingModule} from './room-routing.module';
import {RoomComponent} from './room.component';
import {CoreModule} from "@app/core/core.module";

@NgModule({
  imports: [
    CommonModule,
    RoomRoutingModule,
    CoreModule
  ],
  declarations: [RoomComponent]
})
export class RoomModule {
}
