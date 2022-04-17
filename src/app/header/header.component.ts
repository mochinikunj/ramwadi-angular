import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../service/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private header: HeaderService
  ) { }

  ngOnInit(): void {
  }

  changeLanguage(language: 'en' | 'hi' | 'gu') {
    this.header.changeLanguage(language);
  }
}
