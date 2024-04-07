import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {AccountService} from "../../_services/account.service";
import {AlertService} from "../../_services/alert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})



export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]}
      , {validator: this.passwordMatchValidator}
  );
  }


  passwordMatchValidator() : ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      if (formGroup.get('password')?.value === this.form.get('password2')?.value)
        return null;
      else
        return {passwordMismatch: true};
    };
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  get password() { return this.form.get('password'); }
  get password2() { return this.form.get('password2'); }

  onPasswordInput() {
    if (this.form.hasError('passwordMismatch'))
      this.password2?.setErrors([{'passwordMismatch': true}]);
    else
      this.password2?.setErrors(null);
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();
    console.log(1)
    // stop here if form is invalid
    if (this.form.invalid) {
      console.log(2)
      return;
    }

    this.loading = true;
    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
