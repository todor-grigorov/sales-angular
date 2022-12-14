import { Component, NgModule, OnInit } from '@angular/core';
import { CarAttributes } from '../create/create.component';
import { CrudService } from '../crud.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  documents = Array<CarAttributes>();

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.getLatestAdds()
      .then(res => {
        this.documents = res;
      })
  }

}
