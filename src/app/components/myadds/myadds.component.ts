import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarAttributes } from '../create/create.component';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-myadds',
  templateUrl: './myadds.component.html',
  styleUrls: ['./myadds.component.css']
})
export class MyaddsComponent implements OnInit {

  documents = Array<CarAttributes>();

  constructor(private crudService: CrudService, private router: Router) {
    const user = JSON.parse(localStorage.getItem('user') || '');
    this.crudService.getUserAdds(user.uid)
      .then((docs: Array<CarAttributes>) => {
        this.documents = docs;
      })
      .catch(error => console.log(error));
  }

  onDelete(event: Event, id: any) {
    this.crudService.deleteAdd(id)
      .then(res => {
        const user = JSON.parse(localStorage.getItem('user') || '');
        this.crudService.getUserAdds(user.uid)
          .then((docs: Array<CarAttributes>) => {
            this.documents = docs;
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }

  ngOnInit(): void {
  }

}
