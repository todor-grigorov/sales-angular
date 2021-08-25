import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { allModels } from 'src/app/shared/models/allModels';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';

export interface CarAttributes {
  brand: string;
  model: string;
  price: number;
  buildYear: number;
  engineType: string;
  gearType: string;
  phoneNumber: string;
  address: string;
  airbags: boolean;
  isofix: boolean;
  esp: boolean;
  doors2: boolean;
  doors4: boolean;
  ledLights: boolean;
  bluetooth: boolean;
  dvd: boolean;
  cruiseControl: boolean;
  awd: boolean;
  disabledPeople: boolean;
  centralLock: boolean;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  models = Array<string>();
  brandFormControl = new FormControl('');
  safety: FormGroup;
  exterior: FormGroup;
  comfort: FormGroup;
  other: FormGroup;

  constructor(fb: FormBuilder) {
    this.safety = fb.group({
      airbags: false,
      isofix: false,
      esp: false
    });
    this.exterior = fb.group({
      doors2: false,
      doors4: false,
      ledLights: false
    });
    this.comfort = fb.group({
      bluetooth: false,
      dvd: false,
      cruiseControl: false
    });
    this.other = fb.group({
      awd: false,
      disabledPeople: false,
      centralLock: false
    });
  }

  submit(create: any) {
    // console.log(create);
    // console.log(this.safety);
    // console.log(this.exterior);
    // console.log(this.comfort);
    // console.log(this.other);
    const carAttributes = { ...create.form.value, ...this.safety.value, ...this.exterior.value, ...this.comfort.value, ...this.other.value };
    console.log(carAttributes);
  }

  onBrandSelection(event: any) {
    const brand = event.value as "Audi" | "BMW" | "VW";
    this.models = allModels[brand];
  }

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
