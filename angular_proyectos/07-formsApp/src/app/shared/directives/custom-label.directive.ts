import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
  standalone: false
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors: ValidationErrors | null = null;

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value || null;
    this.setErrorMessage();
  }

  public get color(): string {
    return this._color;
  }

  public get errors(): ValidationErrors | null {
    return this._errors;
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }

  ngOnInit(): void {
    this.setStyle();
  }


  setStyle(): void {
    if (!this.htmlElement) return;

    this.htmlElement!.nativeElement.style.color = this.color;
  }

  setErrorMessage(): void {
    if (!this.htmlElement) return;
    if (!this.errors) {
      this.htmlElement.nativeElement.innerText = '';
      return;
    }

    const errors: string[] = Object.keys(this.errors);

    if (!errors.length) {
      this.htmlElement.nativeElement.innerText = '';
      return;
    }

    let message_error = "";
    let error = this.errors[errors[0]];


    switch (errors[0]) {
      case 'required':
        message_error = 'Este campo es requerido.';
        break;
      case 'minlength':
        const min = error['requiredLength'];
        const current = error['actualLength'];
        message_error = `Mínimo ${current}/${min} caracteres.`;
        break;
      case 'email':
        message_error = 'No tiene formato de correo.';
        break;
      default:
        message_error = 'Hay un error';
        break;
    }

    this.htmlElement.nativeElement.innerText = message_error;


  }


}