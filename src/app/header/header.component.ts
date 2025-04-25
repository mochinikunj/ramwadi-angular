import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../service/header/header.service';
import { CommonService } from '../service/common/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public selectedLanguage = 'en';
  public appLanguages = [
    { title: 'English', code: 'en' },
    { title: 'हिन्दी', code: 'hi' },
    { title: 'ગુજરાતી', code: 'gu' },
  ];

  constructor(private common: CommonService, private header: HeaderService) {}

  ngOnInit(): void {
    // this.common.healthCheck().subscribe({
    //   next: (response: any) => {
    //     if (response && response.code === 200 && response.status === 'OK') {
    //       console.log('Backend is up and running...');
    //     }
    //   },
    // });

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
