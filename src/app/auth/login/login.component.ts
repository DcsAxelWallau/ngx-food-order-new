import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'dcs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Input() public authFailed: boolean;
  @Output() public onAuthenticate: EventEmitter<string> = new EventEmitter();
  public form: FormGroup;

  get emailInput() {
    return this.form.get('email') as FormControl;
  }

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
    });
  }

  public login(e: Event) {
    e && e.preventDefault();

    if (this.form.valid) {
      console.log('login!!', this.form.value);
      this.onAuthenticate.next(this.form.value.email);
    }
  }
}
