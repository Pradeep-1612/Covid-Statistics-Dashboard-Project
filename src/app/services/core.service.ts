import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  placeList = 'https://covid-api.mmediagroup.fr/v1/cases?country';
  vaccineDetails = 'https://covid-api.mmediagroup.fr/v1/vaccines?country';

  constructor(private http: HttpClient) { }


  // To fetch country list
  getCountryList(): Observable<any> {
    return this.http.get(this.placeList);
  }

  // To fetch country specific statistics & state wise statistics
  getCountryDetails(countryName: string): Observable<any> {
    return this.http.get(this.placeList + '=' + countryName);
  }

  // To fetch country specific vaccination statistics
  getVaccineDetails(countryName: string): Observable<any> {
    return this.http.get(this.vaccineDetails + '=' + countryName);
  }
}
