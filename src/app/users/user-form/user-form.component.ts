import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './../../backend/users/models/user.class';

@Component({
  selector: 'dcs-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnChanges {
  @Input() public user: User;
  @Input() public updating: boolean;
  @Input() public loading: boolean;
  @Input() public error: any;
  @Output() public onSave: EventEmitter<User> = new EventEmitter();

  public form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      planet: fb.group({ name: [''] }),
    });
  }

  public ngOnChanges() {
    this.form.setValue(this.user.toObject());
  }

  public save() {
    if (this.form.valid) {
      this.onSave.next(this.user.merge(this.form.value));
    }
  }
}
