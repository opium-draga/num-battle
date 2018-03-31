import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatDialogModule, MatIconModule, MatInputModule,
  MatProgressSpinnerModule
} from "@angular/material";

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  declarations: [],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {
}
