import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarAttributes } from '../create/create.component';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  images = Array<string>();
  id: string | null = "";
  document = {} as CarAttributes;

  constructor(private crudService: CrudService, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
    })
  }

  ngOnInit(): void {
    if (this.id) {
      this.crudService.getSingleAdd(this.id)
        .then(doc => {
          if (doc) {
            this.document = doc as CarAttributes;
            this.images = this.document.images;
          }
        })
        .catch(error => console.log(error));
    }
  }

}
