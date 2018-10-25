import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[scroll-on-click]'
})
export class ScrollOnClickDirective {

  private _elementId: string;
  private _element: HTMLElement;
  private _elementTop: number;
  private _navBarBottom: number;

  constructor(private el: ElementRef) { }

  @Input('element-id') set setElementById(id: string) {
    window.setTimeout(() => {
      this._elementId = id;
      this._element = document.getElementById(this._elementId);
      if (this._element) {
        this._elementTop = this._element.getBoundingClientRect().top;
      }
    });
  }

  @HostListener('click') onClick() {
    if (this._element) {
      window.scrollTo({
        top: this._elementTop,
        behavior: 'smooth'
      });
    }
  }
}
