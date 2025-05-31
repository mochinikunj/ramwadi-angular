import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ReCaptcha2Component } from 'ngx-captcha';
import { environment } from 'src/environments/environment';
import { CommonService } from '../service/common/common.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  readonly siteKey = environment.reCaptchaSiteKey;
  readonly recaptcha = environment.production
    ? ['', Validators.required]
    : [''];

  @ViewChild('recaptcha') captchaElem: ReCaptcha2Component | undefined;

  viewState: 'form' | { type: 'success' | 'error'; message: string } = 'form';
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private common: CommonService,
  ) {}

  ngOnInit(): void {}

  contactForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.email,
      ],
    ],
    contactNumber: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    ],
    subject: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    message: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(2000),
      ],
    ],
    recaptcha: this.recaptcha,
  });

  getControl(formKey: string): AbstractControl | null {
    return this.contactForm.get(formKey);
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitFormToBackend(this.contactForm.value);
  }

  submitFormToBackend(request: object): void {
    this.common.saveContactUsForm(request).subscribe({
      next: (response: any) => {
        if (response && response.code === 200 && response.status === 'OK') {
          this.viewState = {
            type: 'success',
            message:
              'Form Submitted Successfully. We will get back to you soon.',
          };
          this.resetContactForm();
        }
      },
      error: (err) => {
        let message = 'An unexpected error occurred. Please try again later.';
        if (err.status === 400) {
          message =
            err.error?.error?.message ||
            'Invalid form data. Please check your inputs.';
        } else if (err.status === 429) {
          message = 'Too many requests. Please try again after 10 minutes.';
        } else if (err.status === 403) {
          message = 'Invalid or expired submission. Please try again.';
        }
        this.viewState = { type: 'error', message };
        this.resetContactForm();
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }

  resetContactForm(): void {
    if (this.captchaElem) {
      this.captchaElem.resetCaptcha();
    }
    this.contactForm.reset();
  }

  resetToForm(): void {
    this.viewState = 'form';
    this.resetContactForm();
  }
}
