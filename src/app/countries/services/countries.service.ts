import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Region, SmallCountry } from '../interfaces/country.interfaces';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseUrl: string = 'https://restcountries.com/v3.1';

  private _region: Region[] = [ Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania ];

  constructor( private http: HttpClient ) { }

  get regions(): Region[] {
    return [...this._region];
  }

  getCountriesByRegion( region: Region) : Observable<SmallCountry[]> {

    if( !region ) return of([])

    const url : string = `${this.baseUrl}/region/${region}?=fields=cca3,name,borders`;

    return this.http.get<SmallCountry[]>(url).pipe( tap( r => console.log(r) ) );
  }
}
