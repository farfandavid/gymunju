import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[validacionPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ValidacionPasswordDirective, multi: true }]
})
export class ValidacionPasswordDirective implements Validator {



  constructor() { }
  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    const password = <string>control.value;

    if (!password) { return; }
    if (password.length < 4) { return; }

    if (password === password.toLowerCase()) {
      return { 'passwordValidation': { 'message': 'La contraseña debe contener al menos una mayúscula' } }
    }
    if (password === password.toUpperCase()) {
      return { 'passwordValidation': { 'message': 'La contraseña debe contener al menos una minúscula' } }
    }
    return null;
  }

}
