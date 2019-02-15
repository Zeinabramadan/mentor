import { Directive, Input } from '@angular/core';
import {
  Validator,
  ValidationErrors,
  AbstractControl,
  NG_VALIDATORS
} from '@angular/forms';
import { Subscription } from 'rxjs';
@Directive({
  selector: '[match]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchValidator,
      multi: true
    }
  ]
})
export class MatchValidator implements Validator {
  @Input('match') controlNameToMatch: string;

  validate(c: AbstractControl): ValidationErrors | null {
    if (c.value === null || c.value.length === 0) {
      return null;
    }
    const controlNameToMatch = c.root.get(this.controlNameToMatch);
    if (controlNameToMatch) {
      const subscription: Subscription = controlNameToMatch.valueChanges.subscribe(
        () => {
          c.updateValueAndValidity();
          subscription.unsubscribe();
        }
      );
    }
    return controlNameToMatch && controlNameToMatch.value !== c.value
      ? { match: true }
      : null;
  }
}
