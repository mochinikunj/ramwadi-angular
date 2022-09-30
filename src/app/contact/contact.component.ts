import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ReCaptcha2Component } from 'ngx-captcha';
import { environment } from 'src/environments/environment';
import { CaptchaResponse } from '../models/captchaResponse';
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
    name: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(50) ] ],
    email: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(50), Validators.email ] ],
    contactNumber: [ '', [Validators.required, Validators.maxLength(20) ] ],
    subject: [ '', [ Validators.required, Validators.maxLength(100) ] ],
    message: [ '', [ Validators.required, Validators.maxLength(2000) ] ],
    recaptcha: [ '', Validators.required ]
  });
  
  // common function to get formControls
  getControl(formKey: string): AbstractControl | null {
    return this.contactForm.get(formKey);
  }

  async validateCaptcha() {
    try {
      const recaptcha = this.contactForm.get('recaptcha')?.value;
      const response: CaptchaResponse = await this.common.validateCaptcha(recaptcha);

      if (!(response && response.success)) {
        throw new Error();
      }
      
      return true;
    } catch (err) {
      return false;
    }
  }

  resetContactForm(): void {
    if (this.captchaElem) {
      this.captchaElem.resetCaptcha();
    }
    
    this.contactForm.reset();
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      // do something
      return;
    }

    console.log(this.contactForm.value);
    try {
      const captchaValid = await this.validateCaptcha();
      if (!captchaValid) {
        return alert('Invalid Captcha!');
      }

      // write logic to submit form
      alert('Form Submitted Successfully!');
      
      this.resetContactForm();
    } catch (err) {
      const msg = 'There are some technical problems, please continue after sometime!';
      alert(msg + JSON.stringify(err));
    }
  }
  
}
