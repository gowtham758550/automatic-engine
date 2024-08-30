import { Directive, Input, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from '../app.model';

@Directive({
  selector: '[appMultiSelect]',
  standalone: true
})
export class MultiSelectDirective implements OnChanges {
  @Input() selectedValues: string[] = [];
  @Input() selectedValue!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedValues'] || changes['value']) {
      this.updateCheckedState();
    }
  }

  private updateCheckedState(): void {
    const isChecked = this.selectedValues.includes(this.selectedValue);
    this.renderer.setProperty(this.el.nativeElement, 'checked', isChecked);
  }
}
