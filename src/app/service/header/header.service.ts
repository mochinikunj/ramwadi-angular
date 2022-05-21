import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { Language } from '../../models/languages';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private appLanguages: Language['appLanguage'][] = [ 'en', 'hi', 'gu' ];
  private userLanguage = localStorage.getItem('lang') || navigator.language.slice(0, 2);

  constructor(
    private translate: TranslateService
  ) {
    if (this.userLanguage && this.appLanguages.includes(this.userLanguage as Language['appLanguage'])) {
      this.changeLanguage(this.userLanguage);
    }
  }

  private language = new BehaviorSubject('en');
  languageChange = this.language.asObservable();
  changeLanguage(language: string) {
    localStorage.setItem('lang', language);
    this.translate.use(language);
    this.language.next(language);
  }
}
