import { Component, OnInit } from '@angular/core';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // const swiper = new Swiper(".mySwiper", {
  //   spaceBetween: 10,
  //   slidesPerView: 4,
  //   freeMode: true,
  //   watchSlidesVisibility: true,
  //   watchSlidesProgress: true,
  // });
  // const swiper2 = new Swiper(".mySwiper2", {
  //   spaceBetween: 10,
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  //   thumbs: {
  //     swiper: swiper,
  //   },
  // });
}
