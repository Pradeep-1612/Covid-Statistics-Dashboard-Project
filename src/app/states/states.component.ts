import { Component, OnInit } from '@angular/core';
import { CoreService } from '../services/core.service';
import { UtilService } from '../services/util.service';
import { faExclamation, faFrownOpen } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {

  faFrownOpen = faFrownOpen;
  isErrorOccurred = false;
  faExclamation = faExclamation;
  stateWiseData: { 'stateName': string, 'confirmed': number, 'recovered': number, 'deaths': number }[] = [];
  mainLS = true;
  constructor(private coreService: CoreService, private utilService: UtilService) {

    // Calls when this component / States page becomes active
    this.utilService.stateWiseStats.subscribe((countryName: string) => {
      this.mainLS = true; // Initiate Progress spinner

      // To get state wise details
      this.coreService.getCountryDetails(countryName).subscribe((response) => {
        this.stateWiseData = [];
        delete response.All; // Deleting 'All' key,  which is currently not required in this page's response Object.
        Object.keys(response).forEach((key) => {
          this.stateWiseData.push({
            stateName: key, confirmed: response[key].confirmed,
            recovered: response[key].recovered, deaths: response[key].deaths
          });
        });
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

  // Calls when this component / States page becomes active
  callCountryStats(): void {
    this.utilService.loadStats.next();
  }

}
