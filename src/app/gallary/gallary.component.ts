import { Component, OnInit } from '@angular/core';
import { GallaryCategory } from '../models/gallaryCategory';

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.css'],
})
export class GallaryComponent implements OnInit {
  selectedCategory = 'all';

  imgCategoryArray: GallaryCategory[] = [
    { category: 'temples', totalImg: 6 },
    { category: 'founder-guru', totalImg: 7 },
    { category: 'sundarkand', totalImg: 4 },
    { category: 'events', totalImg: 1 },
  ];

  imgList: string[] = [];
  selectedImgIndex = 0;

  constructor() {}

  ngOnInit(): void {
    this.getPhotoes(this.selectedCategory);
  }

  getPhotoes(category: string): void {
    this.selectedCategory = category;
    this.addImgUrl();
  }

  addImgUrl(): void {
    this.imgList = [];
    this.imgCategoryArray.forEach((category) => {
      const categoryName = category.category;
      if (
        this.selectedCategory === 'all' ||
        this.selectedCategory === categoryName
      ) {
        for (let i = 1; i <= category.totalImg; i++) {
          const imgPath = `assets/images/gallary/${categoryName}/${categoryName} (${i}).jpg`;
          this.imgList.push(imgPath);
        }
      }
    });
  }

  goToPrevImg() {
    this.selectedImgIndex--;

    if (this.selectedImgIndex === -1) {
      this.selectedImgIndex = this.imgList.length - 1;
    }
  }

  goToNextImg() {
    const totalImg = this.imgList.length;
    this.selectedImgIndex++;

    if (this.selectedImgIndex === totalImg) {
      this.selectedImgIndex = 0;
    }
  }
}
