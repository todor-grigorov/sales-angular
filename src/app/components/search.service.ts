import { Injectable } from '@angular/core';
import { SearchAttributes } from './search/search.component';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchAttributes: SearchAttributes;

  constructor() {
    this.searchAttributes = {
      brand: '',
      model: '',
      price: '',
      buildYear: '',
      engineType: '',
      gearType: '',
      phoneNumber: '',
      address: '',
      airbags: false,
      isofix: false,
      esp: false,
      doors2: false,
      doors4: false,
      ledLights: false,
      bluetooth: false,
      dvd: false,
      cruiseControl: false,
      awd: false,
      disabledPeople: false,
      centralLock: false,
      images: false,
      priceFrom: '',
      priceTo: '',
      buildYearFrom: '',
      buildYearTo: '',
    } as unknown as SearchAttributes;
  }

  setSearchAttributes(attributes: SearchAttributes) {
    this.searchAttributes = attributes;
  }

  getSearchAttributes() {
    return this.searchAttributes;
  }
}
