import { Component, OnInit } from '@angular/core';
import { faExclamation, faFrownOpen } from '@fortawesome/free-solid-svg-icons';
import { CoreService } from '../services/core.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent implements OnInit {

  faFrownOpen = faFrownOpen;
  isErrorOccurred = false;
  faExclamation = faExclamation;
  countryWiseVaccinatedData: any = {};
  mainLS = true;
  constructor(private coreService: CoreService, private utilService: UtilService) {

    // Calls when this component / Vaccine page becomes active
    this.utilService.vaccineStats.subscribe((countryName: string) => {
      this.mainLS = true; // Initiate Progress spinner

      // To get country wise vaccine details
      this.coreService.getVaccineDetails(countryName).subscribe((response) => {
        this.countryWiseVaccinatedData = response.All;
        this.mainLS = false; // Closes Progress spinner
      }, (error) => {
        this.isErrorOccurred = true;
      });
    });
  }

  ngOnInit(): void {
    this.mainLS = true;
    this.isErrorOccurred = false;
    this.callCountryVaccineStats();
  }

  // Calls when this component / Vaccine page becomes active
  callCountryVaccineStats(): void {
    this.utilService.loadStats.next();
  }

}

