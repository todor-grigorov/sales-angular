import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { allModels } from 'src/app/shared/models/allModels';
import { CarAttributes } from '../create/create.component';
import { CrudService } from '../crud.service';

export interface SearchAttributes extends CarAttributes {
  priceFrom: number;
  priceTo: number;
  buildYearFrom: number;
  buildYearTo: number;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  models = Array<string>();
  brandFormControl = new FormControl('');
  safety: FormGroup;
  exterior: FormGroup;
  comfort: FormGroup;
  other: FormGroup;

  documents = Array<CarAttributes>();

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

  submit(search: any) {
    if (search.form.valid) {
      console.log(search.form.value);
      const carAttributes: SearchAttributes = { ...search.form.value, ...this.safety.value, ...this.exterior.value, ...this.comfort.value, ...this.other.value };
      carAttributes.brand = this.brandFormControl.value;
      this.crudService.onSearch(carAttributes)
        .then((docs: Array<CarAttributes>) => {
          this.documents = docs;
          this.router.navigateByUrl('/results', { state: docs });
          // this.router.getCurrentNavigation().extras.state
        })
        .catch(error => console.log(error));
    }
  }



  onBrandSelection(event: any) {
    const brand = event.value as "Audi" | "BMW" | "VW";
    this.models = allModels[brand];
  }

  ngOnInit(): void {
  }

}
