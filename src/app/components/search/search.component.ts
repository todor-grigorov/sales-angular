import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { allModels } from 'src/app/shared/models/allModels';
import { CarAttributes } from '../create/create.component';
import { CrudService } from '../crud.service';
import { SearchService } from '../search.service';

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
  modelFormControl = new FormControl('');
  buildYearFromFormControl = new FormControl('');
  buildYearToFormControl = new FormControl('');
  engineTypeFormControl = new FormControl('');
  gearTypeFormControl = new FormControl('');
  priceFromFormControl = new FormControl('');
  priceToFormControl = new FormControl('');
  safety: FormGroup;
  exterior: FormGroup;
  comfort: FormGroup;
  other: FormGroup;

  documents = Array<CarAttributes>();

  constructor(fb: FormBuilder, private crudService: CrudService, private router: Router, private searchService: SearchService) {
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

    // this.brandFormControl.setValue("Audi");
    this.setValuesFromRoute(this.searchService.getSearchAttributes());


  }

  submit(search: any) {
    if (search.form.valid) {
      console.log(search.form.value);
      const searchAttributes: SearchAttributes = { ...search.form.value, ...this.safety.value, ...this.exterior.value, ...this.comfort.value, ...this.other.value };
      searchAttributes.brand = this.brandFormControl.value;
      searchAttributes.model = this.modelFormControl.value;
      searchAttributes.buildYearFrom = this.buildYearFromFormControl.value;
      searchAttributes.buildYearTo = this.buildYearToFormControl.value;
      searchAttributes.engineType = this.engineTypeFormControl.value;
      searchAttributes.gearType = this.gearTypeFormControl.value;
      searchAttributes.priceFrom = this.priceFromFormControl.value;
      searchAttributes.priceTo = this.priceToFormControl.value;
      this.crudService.onSearch(searchAttributes)
        .then((docs: Array<CarAttributes>) => {
          this.documents = docs;
          this.router.navigateByUrl('/results', { state: { docs: docs } });
          // this.router.getCurrentNavigation().extras.state
          this.searchService.setSearchAttributes(searchAttributes);
        })
        .catch(error => console.log(error));
    }
  }

  onBrandSelection(event: any) {
    const brand = event.value as "Audi" | "BMW" | "VW";
    this.models = allModels[brand];
  }

  setValuesFromRoute(historySearcAttributes: SearchAttributes) {
    this.brandFormControl.setValue(historySearcAttributes.brand || "");
    this.models = allModels[historySearcAttributes.brand as "Audi" | "BMW" | "VW"];
    this.modelFormControl.setValue(historySearcAttributes.model ? allModels[historySearcAttributes.brand as "Audi" | "BMW" | "VW"].find(model => model === historySearcAttributes.model) : "");
    this.buildYearFromFormControl.setValue(historySearcAttributes.buildYearFrom || "");
    this.buildYearToFormControl.setValue(historySearcAttributes.buildYearTo || "");
    this.engineTypeFormControl.setValue(historySearcAttributes.engineType || "");
    this.gearTypeFormControl.setValue(historySearcAttributes.gearType || "");
    this.priceFromFormControl.setValue(historySearcAttributes.priceFrom || "");
    this.priceToFormControl.setValue(historySearcAttributes.priceTo || "");
    this.safety.patchValue({
      airbags: historySearcAttributes.airbags || false,
      isofix: historySearcAttributes.isofix || false,
      esp: historySearcAttributes.esp || false
    });
    this.exterior.patchValue({
      doors2: historySearcAttributes.doors2 || false,
      doors4: historySearcAttributes.doors4 || false,
      ledLights: historySearcAttributes.ledLights || false
    });
    this.comfort.patchValue({
      bluetooth: historySearcAttributes.bluetooth || false,
      dvd: historySearcAttributes.dvd || false,
      cruiseControl: historySearcAttributes.cruiseControl || false
    });
    this.other.patchValue({
      awd: historySearcAttributes.awd || false,
      disabledPeople: historySearcAttributes.disabledPeople || false,
      centralLock: historySearcAttributes.centralLock || false
    });
  }

  ngOnInit(): void {
  }

}
