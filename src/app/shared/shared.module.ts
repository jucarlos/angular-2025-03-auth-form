import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { SpinnerComponent } from './components/spinner/spinner.component';




@NgModule({
  declarations: [
    AlertComponent,
    SpinnerComponent
  ],
  exports: [ 
    AlertComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
 
  ]
})
export class SharedModule { }
