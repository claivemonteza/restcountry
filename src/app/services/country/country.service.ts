import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from 'src/app/model/country.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private api = `${environment.api}`;
  constructor(private _http: HttpClient) { }

  getAllCountries() {
    return this._http.get<Country[]>(`${this.api}/all`);
  }

}
