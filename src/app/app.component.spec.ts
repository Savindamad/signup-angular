import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        ReactiveFormsModule,
        PasswordModule,
        HttpClientTestingModule],
      providers: [UserService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should require first name', () => {
    component.signupForm.setValue({
      fname: '',
      lname: 'Maddage',
      email: 'test@gmail.com',
      password: 'Abcd@123'
    });

    expect(component.fname?.valid).toEqual(false);
    expect(component.signupForm.valid).toEqual(false);
  });

  it('should require last name', () => {
    component.signupForm.setValue({
      fname: 'Savinda',
      lname: '',
      email: 'test@gmail.com',
      password: 'Abcd@123'
    });

    expect(component.lname?.valid).toEqual(false);
    expect(component.signupForm.valid).toEqual(false);
  });

  it('should require email', () => {
    component.signupForm.setValue({
      fname: 'Savinda',
      lname: 'Maddage',
      email: '',
      password: 'Abcd@123'
    });

    expect(component.email?.valid).toEqual(false);
    expect(component.signupForm.valid).toEqual(false);
  });

  it('should require valid email', () => {
    component.signupForm.setValue({
      fname: 'Savinda',
      lname: 'Maddage',
      email: 'test@',
      password: 'Abcd@123'
    });

    expect(component.email?.valid).toEqual(false);
    expect(component.signupForm.valid).toEqual(false);
  });

  it('should require valid email', () => {
    component.signupForm.setValue({
      fname: 'Savinda',
      lname: 'Maddage',
      email: 'test@',
      password: 'Abcd@123'
    });

    expect(component.email?.valid).toEqual(false);
    expect(component.signupForm.valid).toEqual(false);
  });

  it('should require 8 min length password', () => {
    component.signupForm.setValue({
      fname: 'Savinda',
      lname: 'Maddage',
      email: 'test@',
      password: 'Abcd@12'
    });

    expect(component.password?.valid).toEqual(false);
    expect(component.password?.errors?.['minlength']).toEqual({ requiredLength: 8, actualLength: 7 });
    expect(component.signupForm.valid).toEqual(false);
  });

  it('should require at least one uppercase letter', () => {
    component.signupForm.setValue({
      fname: 'Savinda',
      lname: 'Maddage',
      email: 'test@',
      password: 'abcd@123'
    });

    expect(component.password?.valid).toEqual(false);
    expect(component.password?.errors?.['noUppercase']).toEqual(true);
    expect(component.signupForm.valid).toEqual(false);
  });

  it('should require at least one lowercase letter', () => {
    component.signupForm.setValue({
      fname: 'Savinda',
      lname: 'Maddage',
      email: 'test@',
      password: 'ABCD@123'
    });

    expect(component.password?.valid).toEqual(false);
    expect(component.password?.errors?.['noLowerCase']).toEqual(true);
    expect(component.signupForm.valid).toEqual(false);
  });

  it('should not include users first name or last name in the password', () => {
    component.signupForm.setValue({
      fname: 'savinda',
      lname: 'maddage',
      email: 'test@',
      password: 'Savinda@123'
    });

    expect(component.signupForm?.valid).toEqual(false);
    expect(component.signupForm?.errors?.['nameIncludes']).toEqual(true);
    expect(component.signupForm.valid).toEqual(false);

    component.signupForm.setValue({
      fname: 'savinda',
      lname: 'maddage',
      email: 'test@',
      password: 'Maddage@123'
    });

    expect(component.signupForm?.valid).toEqual(false);
    expect(component.signupForm?.errors?.['nameIncludes']).toEqual(true);
    expect(component.signupForm.valid).toEqual(false);
  });
});
