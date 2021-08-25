import { formatCurrency } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { allModels } from 'src/app/shared/models/allModels';
import { CrudService } from '../crud.service';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
import { Router } from '@angular/router';

export interface CarAttributes {
  uid?: string;
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
  images: Array<string>;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit {

  @ViewChild('uploadFile') uploadFile!: ElementRef<HTMLInputElement>;

  models = Array<string>();
  brandFormControl = new FormControl('');
  safety: FormGroup;
  exterior: FormGroup;
  comfort: FormGroup;
  other: FormGroup;
  images = Array<string>();
  route: string = "";

  constructor(fb: FormBuilder, private crudService: CrudService, private router: Router) {
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

    router.events.subscribe(val => {
      console.log(val);
      console.log(location.pathname)
      // if (location.pathname != "") {
      //   this.route = location.pathname;
      // } else {
      //   this.route = "Home";
      // }
    })
  }

  submit(create: any) {
    const carAttributes: CarAttributes = { ...create.form.value, ...this.safety.value, ...this.exterior.value, ...this.comfort.value, ...this.other.value };
    carAttributes.images = this.images;
    this.crudService.createAdd(carAttributes)
      .then(isSuccess => {
        if (isSuccess) {
          this.router.navigate(['/']);
        }
      })
  }

  handlePhotoClick() {
    this.uploadFile.nativeElement.accept = ".png, .bmp, .jpg, .jpeg, .gif";
    this.uploadFile.nativeElement.click();
    this.uploadFile.nativeElement.addEventListener("change", this.uploadImages.bind(this))
  }

  uploadImages(event: any) {
    if (event.target.files.length) {
      this.crudService.uploadFileAndGetMetadata(event.target.files[0])
        .then((url: any) => {
          this.images = [...this.images, url];
        })
    }
  }

  onBrandSelection(event: any) {
    const brand = event.value as "Audi" | "BMW" | "VW";
    this.models = allModels[brand];
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    console.log("Create Destroy");
  }
}
