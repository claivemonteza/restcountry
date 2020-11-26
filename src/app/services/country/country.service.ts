import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from 'src/app/model/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  url = 'https://restcountries.eu/rest/v2'
  constructor(private _http: HttpClient) { }

  getAllCountries() {
    return this._http.get<Country[]>(`${this.url}/all`);
  }

  getCountriesWithSelectFields() {
    return this._http.get<Country[]>(`${this.url}/all?fields=name;capital;region;subregion;population;area;nativeName;timezones;flag`);
  }

}
