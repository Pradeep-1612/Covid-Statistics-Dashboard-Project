import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CoreService } from '../services/core.service';
import { UtilService } from '../services/util.service';
import { faFrownOpen } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faFrownOpen = faFrownOpen;
  mainLS = true;
  isErrorOccurred = false;
  @Input()
  sidenav!: MatSidenav;

  countryList = {};
  countryName = 'India';
  constructor(private coreService: CoreService, private router: Router, private utilService: UtilService) {

    // To call corresponding page services if a page becomes active
    this.utilService.loadStats.subscribe(() => {
      this.onCountrySelected();
    });
  }

  ngOnInit(): void {
    this.mainLS = true;
    this.isErrorOccurred = false;
    this.loadCountryList();
  }

  // To load list of countries into dropdown
  loadCountryList(): void {
    this.mainLS = true;
    this.isErrorOccurred = false;
    this.coreService.getCountryList().subscribe((response) => {
      this.countryList = response;
      this.onCountrySelected();
      this.mainLS = false;
    }, (error) => {
      this.isErrorOccurred = true;
    });
  }


  // To call corresponding page services if a page becomes active
  onCountrySelected(): void {
    const currentPage = this.router.url.split('?')[0];
    if (currentPage === '/home') {
      this.utilService.countryWiseStats.next(this.countryName);
    }
    else if (currentPage === '/states') {
      this.utilService.stateWiseStats.next(this.countryName);
    }
    else {
      this.utilService.vaccineStats.next(this.countryName);
    }
  }

}
