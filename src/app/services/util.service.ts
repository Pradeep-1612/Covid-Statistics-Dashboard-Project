import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {


  countryWiseStats: Subject<string>; // triggers when user lands on Country wise statistics / Home page
  stateWiseStats: Subject<string>; // triggers when user lands on State wise statistics / States page
  vaccineStats: Subject<string>; // triggers when user lands on Country wise vaccine statistics / Vaccine page

  loadStats: Subject<any>; // to load all statistics based on page, that user currently residing on.


  constructor() {
    this.countryWiseStats = new Subject<string>();
    this.stateWiseStats = new Subject<string>();
    this.vaccineStats = new Subject<string>();

    this.loadStats = new Subject<any>();
  }
}
