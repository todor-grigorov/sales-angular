import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarAttributes } from '../create/create.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  documents = Array<CarAttributes>();

  constructor(private router: Router) {
    this.documents = this.router.getCurrentNavigation()!.extras.state?.docs as Array<CarAttributes>;
    console.log(this.documents);

  }

  ngOnInit(): void {
  }

}
