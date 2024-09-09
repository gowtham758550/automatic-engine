import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Item } from '../app.model';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-select-with-action',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './select-with-action.component.html',
  styleUrl: './select-with-action.component.scss'
})
export class SelectWithActionComponent {

  @Input() options: Item[] = [
    {
      value: 'HR',
      id: 'hr'
    },
    {
      value: 'IT',
      id: 'it'
    },
    {
      value: 'Finance',
      id: 'finance'
    },
    {
      value: 'Admin',
      id: 'admin'
    }
  ];
  selectedItem!: Item;

  confirmation() {
    alert(
      `Are you sure you want to delete ${this.selectedItem?.value} department?`
    );
  }
}
