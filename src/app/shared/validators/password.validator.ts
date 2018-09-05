import { AbstractControl } from "@angular/forms";

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get("password").value;
    let password_confirmation = AC.get("password_confirmation").value;
    if (password != password_confirmation) {
      AC.get("password_confirmation").setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }
}