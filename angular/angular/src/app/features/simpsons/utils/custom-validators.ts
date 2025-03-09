import { AbstractControl, ValidationErrors } from "@angular/forms";
import { asyncScheduler, delay, Observable, of, scheduled } from "rxjs";

async function sleep(seconds = 2.5) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
}

export class FormUtils {

  public static validatorSimpson(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    return value !== 'yellow' ? { simpsonError: "Los simpsons son amarillos" } : null;
  }

  public static asycnValidatorSimpson(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    console.log('Validando contra servidor');

    const value = control.value;
    return scheduled([value !== 'yellow' ? { simpsonError: "Los simpsons son amarillos" } : null], asyncScheduler).pipe(
      delay(2000)
    );

  }

  // public static async asycnValidatorSimpson(
  //   control: AbstractControl
  // ): Promise<ValidationErrors | null> {
  //   console.log('Validando contra servidor');

  //   await sleep();

  //   const value = control.value;

  //   return value !== 'yellow' ? { simpsonError: "Los simpsons son amarillos" } : null;
  // }
}
