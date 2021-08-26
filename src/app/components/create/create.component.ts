import { ChangeDetectionStrategy, Component, Renderer2, ElementRef, OnInit, SimpleChanges, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { allModels } from 'src/app/shared/models/allModels';
import { CrudService } from '../crud.service';
import { Router } from '@angular/router';

export interface IObjectKeys {
  [key: string]: string | number | boolean | Array<string> | undefined;
}

export interface CarAttributes extends IObjectKeys {
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
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit {

  // @ViewChild('uploadFile') uploadFile!: ElementRef<HTMLInputElement>;

  models = Array<string>();
  brandFormControl = new FormControl('');
  safety: FormGroup;
  exterior: FormGroup;
  comfort: FormGroup;
  other: FormGroup;
  images = Array<string>();

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
  }

  submit(create: any) {
    if (create.form.valid) {
      let carAttributes: CarAttributes = { ...create.form.value, ...this.safety.value, ...this.exterior.value, ...this.comfort.value, ...this.other.value };
      // Object.keys(carAttributes).forEach(key => {
      //   let el = carAttributes[key];
      //   if (el === false) {
      //     el = "";
      //   }
      // })

      // carAttributes.airbags = carAttributes.airbags === false ? "" : carAttributes.airbags;
      // carAttributes.esp
      // carAttributes.doors2
      // carAttributes.doors4
      // carAttributes.ledLights
      // carAttributes.bluetooth
      // carAttributes.dvd
      // carAttributes.cruiseControl
      // carAttributes.awd
      // carAttributes.disabledPeople
      // carAttributes.centralLock


      carAttributes.brand = this.brandFormControl.value;
      carAttributes.images = this.images;
      const user = JSON.parse(localStorage.getItem('user') || '');
      carAttributes.uid = user.uid;
      this.crudService.createAdd(carAttributes)
        .then(isSuccess => {
          if (isSuccess) {
            this.router.navigate(['/']);
          }
        });
    }
  }


  // handlePhotoClick() {
  //   this.uploadFile.nativeElement.addEventListener("click", function (evt) {
  //     evt.stopPropagation();
  //   }, false);
  //   this.uploadFile.nativeElement.accept = ".png, .bmp, .jpg, .jpeg, .gif";
  //   this.uploadFile.nativeElement.click();
  //   this.uploadFile.nativeElement.addEventListener("change", this.uploadImages.bind(this), false);
  // }

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
