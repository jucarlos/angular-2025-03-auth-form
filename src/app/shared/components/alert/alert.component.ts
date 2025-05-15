import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-alert',
  standalone: false,
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {

  public mensaje = input.required<string>();

}
