import { ChangeDetectionStrategy, Component, Renderer2, ElementRef, OnInit, SimpleChanges, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { allModels } from 'src/app/shared/models/allModels';
import { CrudService } from '../crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarAttributes } from '../create/create.component';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: string | null = "";
  document = {} as CarAttributes;
  models = Array<string>();
  brandFormControl = new FormControl('');
  modelFormControl = new FormControl('');
  buildYearFormControl = new FormControl('');
  engineTypeFormControl = new FormControl('');
  gearTypeFormControl = new FormControl('');
  priceFormControl = new FormControl('');
  phoneNumberFormControl = new FormControl('');
  addressFormControl = new FormControl('');
  safety: FormGroup;
  exterior: FormGroup;
  comfort: FormGroup;
  other: FormGroup;
  images = Array<string>();

  constructor(fb: FormBuilder, private crudService: CrudService, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
    })

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
    const carAttributes: CarAttributes = { ...this.safety.value, ...this.exterior.value, ...this.comfort.value, ...this.other.value };
    carAttributes.images = this.images;
    carAttributes.brand = this.brandFormControl.value;
    carAttributes.model = this.modelFormControl.value;
    carAttributes.buildYear = this.buildYearFormControl.value;
    carAttributes.engineType = this.engineTypeFormControl.value;
    carAttributes.gearType = this.gearTypeFormControl.value;
    carAttributes.address = this.addressFormControl.value;
    carAttributes.phoneNumber = this.phoneNumberFormControl.value;
    carAttributes.price = this.priceFormControl.value;
    carAttributes.uid = this.document.uid;
    if (this.id) {
      this.crudService.updateAdd(carAttributes, this.id)
        .then(isSuccess => {
          if (isSuccess) {
            this.router.navigate(['myadds']);
          }
        });
    }
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

  setAddValues(doc: CarAttributes) {
    this.addressFormControl.setValue(doc.address);
    this.phoneNumberFormControl.setValue(doc.phoneNumber);
    this.priceFormControl.setValue(doc.price.toString());
    this.brandFormControl.setValue(doc.brand);
    this.models = allModels[doc.brand as "Audi" | "BMW" | "VW"];
    this.modelFormControl.setValue(allModels[doc.brand as "Audi" | "BMW" | "VW"].find(model => model === doc.model));
    this.buildYearFormControl.setValue(doc.buildYear);
    this.engineTypeFormControl.setValue(doc.engineType);
    this.gearTypeFormControl.setValue(doc.gearType);
    this.images = doc.images;
    this.safety.patchValue({
      airbags: doc.airbags,
      isofix: doc.isofix,
      esp: doc.esp
    });
    this.exterior.patchValue({
      doors2: doc.doors2,
      doors4: doc.doors4,
      ledLights: doc.ledLights
    });
    this.comfort.patchValue({
      bluetooth: doc.bluetooth,
      dvd: doc.dvd,
      cruiseControl: doc.cruiseControl
    });
    this.other.patchValue({
      awd: doc.awd,
      disabledPeople: doc.disabledPeople,
      centralLock: doc.centralLock
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.crudService.getSingleAdd(this.id)
        .then(doc => {
          if (doc) {
            this.document = doc as CarAttributes;
            this.setAddValues(this.document);
          }
        })
        .catch(error => console.log(error));
    }
  }

}
