import { Component, OnInit } from '@angular/core';
import { faFrownOpen } from '@fortawesome/free-solid-svg-icons';
import { CoreService } from '../services/core.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faFrownOpen = faFrownOpen;
  countryWiseData: any = {};
  mainLS = true;
  isErrorOccurred = false;
  constructor(private coreService: CoreService, private utilService: UtilService) {

    // Calls when this component / Home page becomes active
    this.utilService.countryWiseStats.subscribe((countryName: string) => {
      this.mainLS = true; // Initiate Progress spinner

      // To get country wise details
      this.coreService.getCountryDetails(countryName).subscribe((response) => {
        this.countryWiseData = response;
        this.mainLS = false; // Closes Progress spinner
      }, (error) => {
        this.isErrorOccurred = true;
      });
    });

  }

  ngOnInit(): void {
    this.mainLS = true;
    this.isErrorOccurred = false;
    this.callCountryStats();
  }

  // Calls when this component / Home page becomes active
  callCountryStats(): void {
    this.utilService.loadStats.next();
  }

}
