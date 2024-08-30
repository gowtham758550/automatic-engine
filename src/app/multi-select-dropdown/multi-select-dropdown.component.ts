import { Component, forwardRef, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from '../app.model';
import { NgbDropdownConfig, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiSelectDirective } from './multi-select.directive';

@Component({
  selector: 'app-multi-select-dropdown',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, FormsModule, MultiSelectDirective],
  templateUrl: './multi-select-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectDropdownComponent),
      multi: true
    }
  ],
  styleUrl: './multi-select-dropdown.component.scss'
})
export class MultiSelectDropdownComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() options!: Item[];

  random = Math.floor(Math.random() * 100);
  clonedOptions!: Item[];
  selectedOptions: Item[] = [];
  value!: string[];
  private config = inject(NgbDropdownConfig);
  private onChange: (value: string[]) => void = () => { };
  private onTouched: () => void = () => { };

  ngOnInit(): void {
    this.config.autoClose = false;
    this.clonedOptions = this.options;
  }

  ngOnChanges(changes: SimpleChanges): void {

    // if (changes['options']) {
    // }
  }

  //#region ControlValueAccessor
  writeValue(obj: string[]): void {
    this.value = obj || [];
    this.selectedOptions = this.options.filter(option => this.value.includes(option.id));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }
  //#endregion ControlValueAccessor


  //#region Dropdown
  search(event: Event) {
    const target = event?.target as HTMLInputElement;
    this.clonedOptions = this.options.filter(item => item.value.toLowerCase().includes(target.value.toLowerCase()));
  }

  select(event: boolean, id: string) {
    const element = this.options.find(i => i.id === id);
    if (element) {
      if (event) this.selectedOptions.push(element);
      else this.removeSelection(id);
      this.setSelectedValues();
    }
  }

  removeSelection(id: string) {
    const element = this.options.find(i => i.id === id);
    if (element) {
      this.selectedOptions = this.selectedOptions.filter(i => i.id !== id);
      this.setSelectedValues();
    }
  }

  setSelectedValues() {
    this.value = this.selectedOptions.map(i => i.id);
    this.onChange(this.value);
  }
  //#endregion Dropdown

}
