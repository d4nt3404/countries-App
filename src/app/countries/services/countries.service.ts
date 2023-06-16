import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'
  public cacheStore: CacheStore = {
    byCapital:   { term: '', countries: []},
    byCountry: { term: '', countries: []},
    byRegion:    { region: '', countries: []}
  }

  constructor(private http: HttpClient) {
    this.loadToLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  private loadToLocalStorage() {
    if(!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

    //by = capital | name
  searchCountryInfo(by: string, term: string): Observable<Country[]> {
    const url = `${ this.apiUrl }${ '/' + by + '/' }${ term }`;

    return this.http.get<Country[]>(url)
    .pipe(
      tap( (countries) => {
            if (by === 'capital') {
              this.cacheStore.byCapital = { term, countries }
            } else if (by === 'name') {
              this.cacheStore.byCountry = { term, countries }
            }
        }
      ),
      tap(() => this.saveToLocalStorage()),
      catchError(error => of([])),
    );
  }

  searchCountryInfoRegion(region: Region): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${ region }`;

    return this.http.get<Country[]>(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion = { region, countries }
      ),
      tap(() => this.saveToLocalStorage()),
      catchError(error => of([])),
    );
  }

  searchCountryByAlphaCode(term: string): Observable<Country | null> {
    const url = `${ this.apiUrl }${ '/alpha/' }${ term }`;

    return this.http.get<Country[]>(url)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null ),
      catchError(error => of(null))
    );
  }
}
