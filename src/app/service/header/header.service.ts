import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter } from 'rxjs';
import { Language } from '../../models/languages';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private readonly appLanguages: Language['appLanguage'][] = ['en', 'hi', 'gu'];
  private readonly userLanguage =
    localStorage.getItem('lang') || navigator.language.slice(0, 2);
  private readonly renderer: Renderer2;

  constructor(
    private readonly translate: TranslateService,
    private readonly router: Router,
    private readonly rendererFactory: RendererFactory2,
  ) {
    if (
      this.userLanguage &&
      this.appLanguages.includes(this.userLanguage as Language['appLanguage'])
    ) {
      this.changeLanguage(this.userLanguage);
    }

    this.renderer = rendererFactory.createRenderer(null, null);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkAndCloseBootstrapModel();
      }
    });
  }

  private language = new BehaviorSubject('en');
  languageChange = this.language.asObservable();
  changeLanguage(language: string) {
    localStorage.setItem('lang', language);
    this.translate.use(language);
    this.language.next(language);
  }

  checkAndCloseBootstrapModel() {
    // select the dive with specified classes
    const modelBackDrop = document.querySelector('.modal-backdrop.fade.show');

    // remove the div if it exists
    if (modelBackDrop) {
      this.renderer.removeChild(modelBackDrop.parentNode, modelBackDrop);
    }

    // check if body has any classes or styles
    if (document.body.className || document.body.getAttribute('style')) {
      this.renderer.removeAttribute(document.body, 'class');
      this.renderer.removeAttribute(document.body, 'style');
    }
  }
}
