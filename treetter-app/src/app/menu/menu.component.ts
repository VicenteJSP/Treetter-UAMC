import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseTreetter } from '../models/response-treetter';
import { CredentialsService } from '../services/credentials.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild('closeModal') closeModal: any;
  @Output() spinner: EventEmitter<boolean>;

  formLogin: FormGroup;
  formRegister: FormGroup;
  user: FormGroup;
  authUser: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private _auth: AuthService,
    private _credentials: CredentialsService
  ) {
    this.builder();
    this.authUser = false;
    this.spinner = new EventEmitter<boolean>();
  }

  builder() {
    this.user = this.formBuilder.group({
      email: [''],
      username: ['Batman']
    });
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
    this.formRegister = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      username: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  login(event: Event) {
    event.preventDefault();
    if (this.formLogin.valid) {
      this.spinner.emit(true);
      this._auth.login(this.formLogin.value).subscribe(
        (res: ResponseTreetter) => {
          this._credentials.login(res);
          this.user.patchValue({ username: this._credentials.username });
          this.authUser = true;
          this.formLogin.reset();
          this.spinner.emit(false);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.formLogin.reset();
          this.spinner.emit(false);
        }
      );
    } else { this.formLogin.markAllAsTouched() }
  }

  logout(event: Event) {
    event.preventDefault();
    this.spinner.emit(true);
    this._credentials.logout();
    this.user.reset();
    this.authUser = false;
    this.spinner.emit(false);
  }

  register(event: Event) {
    event.preventDefault();
    if (this.formRegister.valid) {
      this.spinner.emit(true);
      this.closeModal.nativeElement.click();
      this._auth.register(this.formRegister.value).subscribe(
        (res: ResponseTreetter) => {
          this._credentials.login(res);
          this.authUser = true;
          this.user.patchValue({ username: this.formRegister.value.username });
          this.formRegister.reset();
          this.spinner.emit(false);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.formRegister.reset();
          this.spinner.emit(false);
        }
      );
    } else this.formRegister.markAllAsTouched();

  }

  get emailLogin() { return this.formLogin.get('email'); }
  get emailLoginInvalid() { return this.emailLogin.touched && this.emailLogin.invalid; }
  get pwdLogin() { return this.formLogin.get('password'); }
  get pwdLoginInvalid() { return this.pwdLogin.touched && this.pwdLogin.invalid; }

  get emailRegister() { return this.formRegister.get('email'); }
  get emailRegisterInvalid() { return this.emailRegister.touched && this.emailRegister.invalid; }
  get pwdRegister() { return this.formRegister.get('password'); }
  get pwdRegisterInvalid() { return this.pwdRegister.touched && this.pwdRegister.invalid; }
  get usernameRgister() { return this.formRegister.get('username'); }
  get usernameRgisterInvalid() { return this.usernameRgister.touched && this.usernameRgister.invalid; }
}
