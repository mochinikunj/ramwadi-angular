import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../service/header.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public selectedLanguage = 'en';
  public appLanguages = [
    { title: 'English', code: 'en' },
    { title: 'हिन्दी', code: 'hi' },
    { title: 'ગુજરાતી', code: 'gu' }
  ];

  constructor(
    private header: HeaderService
  ) { }

  ngOnInit(): void {
    this.header.languageChange.subscribe((language) => {
      if (language) {
        this.selectedLanguage = language;
      }
    });
  }

  changeLanguage(e: Event) {
    const language = (<HTMLInputElement>e.target).value;
    this.header.changeLanguage(language);
  }
}
