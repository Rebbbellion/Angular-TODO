import { DOCUMENT } from '@angular/common';
import { Directive, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBodyBlock]',
  standalone: false,
})
export class BodyBlockDirective implements OnInit, OnDestroy {
  private readonly renderer: Renderer2 = inject(Renderer2);

  private readonly document: Document = inject(DOCUMENT);
  private readonly bodyEl: HTMLBodyElement = this.document.querySelector(
    'body'
  ) as HTMLBodyElement;
  private readonly wrapperElement: HTMLElement = this.document.querySelector(
    'app-root'
  ) as HTMLElement;

  ngOnInit(): void {
    const bodyPadding: string =
      window.innerWidth - this.wrapperElement.offsetWidth + 'px';
    this.renderer.setStyle(this.bodyEl, 'padding-right', bodyPadding);
    this.renderer.addClass(this.bodyEl, 'lock');
  }

  ngOnDestroy(): void {
    this.renderer.removeStyle(this.bodyEl, 'padding-right');
    this.renderer.removeClass(this.bodyEl, 'lock');
  }
}
