import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-crm-button',
  templateUrl: './crm-button.component.html',
  styleUrls: ['./crm-button.component.scss']
})
export class CrmButtonComponent {
  @Input() text: string | undefined;
  @Input() icon: string | undefined;
  @Input() padding: 'small' | 'medium' | 'big' = 'small';
  @Input() pulse: boolean = false;
  @Input() verticalMargin: number = 10;

  constructor() { }
}
