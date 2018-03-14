import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatInputModule} from "@angular/material";

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ]
})
export class MaterialModule {
}
