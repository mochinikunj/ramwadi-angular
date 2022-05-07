import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imgSliderCount = 10;
  imgSliderIterator = [ ...Array(this.imgSliderCount).keys() ].map(num => num + 1);

  constructor() { }

  ngOnInit(): void {
  }

}
