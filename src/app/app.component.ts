import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SignupRequest } from './models/signup-request.mode';
import { UserService } from './services/user.service';
import { PasswordValidator } from './validators/password.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.signupForm = this.formBuilder.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), PasswordValidator.hasLowercaseValidator, PasswordValidator.hasUppercaseValidator]]
    }, { validator: PasswordValidator.nameIncludesValidator });
  }

  get fname() { return this.signupForm.get('fname') };
  get lname() { return this.signupForm.get('lname'); }
  get email() { return this.signupForm.get('email') };
  get password() { return this.signupForm.get('password'); }

  onSignUp(): void {
    const signUpData: SignupRequest = {
      firstName: this.fname?.value,
      lastName: this.lname?.value,
      email: this.email?.value,
      password: this.password?.value
    };

    this.userService.signup(signUpData).subscribe(response => {
      if (response?._id) {
        // todo if success navigate to login page
        alert('You have successfully signed up')
      }
    }, err => {
      // todo handle error
    });
  }

}
