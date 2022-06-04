import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  constructor(
    private http: HttpClient
  ) { }

  async validateCaptcha(captchaValue: string): Promise<object> {
    const endPoint = `${environment.nodeUrl}/api/reCaptchValidate`

    const request = {
      recaptcha: captchaValue
    };

    return await this.http.post(endPoint, request).toPromise();
  }
}
