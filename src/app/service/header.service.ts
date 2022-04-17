import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
    private translate: TranslateService
  ) { }

  changeLanguage(language: 'en' | 'hi' | 'gu') {
    this.translate.use(language);
  }
}
