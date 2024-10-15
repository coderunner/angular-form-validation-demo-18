import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild(FormGroupDirective)
  formDirective: FormGroupDirective | null = null;

  form;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      age: [
        null,
        [
          Validators.required,
          Validators.min(10),
          Validators.max(110),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }

  ngOnInit() {}

  showNameRequiredError(): boolean {
    return this.showError('name', 'required');
  }

  showAgeRequiredError(): boolean {
    return this.showError('age', 'required');
  }

  showAgeMinError(): boolean {
    return this.showError('age', 'min');
  }

  showAgeMaxError(): boolean {
    return this.showError('age', 'max');
  }

  showAgePatternError(): boolean {
    return this.showError('age', 'pattern');
  }

  onSubmit() {
    console.log(this.form.controls.name.errors);
    console.log(this.form.controls.age.errors);
    if (this.form.valid) {
      this.form.reset();
      this.formDirective?.resetForm();
    } else {
      this.form.markAllAsTouched();
    }
  }

  private showError(field: 'name' | 'age', error: string): boolean {
    return (
      this.form.controls[field].hasError(error) &&
      (this.form.controls[field].dirty || this.form.controls[field].touched)
    );
  }
}
