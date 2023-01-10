import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ReCaptcha2Component } from 'ngx-captcha';
import { environment } from 'src/environments/environment';
import { CommonService } from '../service/common/common.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  siteKey = environment.reCaptchaSiteKey;
  @ViewChild('recaptcha') captchaElem: ReCaptcha2Component | undefined;

  constructor(
    private fb: FormBuilder,
    private common: CommonService
  ) { }

  ngOnInit(): void {
  }

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email]],
    contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(20) ]],
    subject: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
    recaptcha: ['', Validators.required]
  });
  
  // common function to get formControls
  getControl(formKey: string): AbstractControl | null {
    return this.contactForm.get(formKey);
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      // do something
      return;
    }

    this.submitFormToBackend(this.contactForm.value);
  }

  submitFormToBackend(request: object): void {
    this.common.saveContactUsForm(request).subscribe((response: any) => {
      if (response && response.code === 200 && response.status === 'OK') {
        alert('Form Submitted Successfully!');
        this.resetContactForm();
      }
    }, (err) => {
      const msg = 'There are some technical problems, please continue after sometime!';
      alert(msg + JSON.stringify(err));
    });
  }

  resetContactForm(): void {
    if (this.captchaElem) {
      this.captchaElem.resetCaptcha();
    }
    
    this.contactForm.reset();
  }
}
