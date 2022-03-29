import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidator {

    public static hasUppercaseValidator(control: AbstractControl): ValidationErrors | null {
        const hasUpper = /[A-Z]/.test(control.value);
        if (!hasUpper) {
            return { noUppercase: true };
        }
        return null;
    }

    public static hasLowercaseValidator(control: AbstractControl): ValidationErrors | null {
        const hasLower = /[a-z]/.test(control.value);
        if (!hasLower) {
            return { noLowerCase: true };
        }
        return null;
    }

    public static nameIncludesValidator(control: AbstractControl): ValidationErrors | null {
        const fname: string = control.get('fname')?.value;
        const lname: string = control.get('lname')?.value;
        const password: string = control.get('password')?.value;

        if (password?.length && (password.toLocaleLowerCase().includes(fname.toLocaleLowerCase())
            || password.toLocaleLowerCase().includes(lname.toLocaleLowerCase()))) {
            return { nameIncludes: true }
        }

        return null;
    }
}