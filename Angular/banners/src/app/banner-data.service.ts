import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerDataService {

  cachedBanners = [];

  readonly endpoint = 'http://localhost:3000/';
  readonly locations = [
    { id: 1, name: 'india' },
    { id: 2, name: 'usa' },
    { id: 3, name: 'australia' },
    { id: 4, name: 'japan' },
    { id: 5, name: 'france' },
  ];

  constructor(private http: HttpClient) { }

  getBannerByLocation(locationId: number): Observable<any> {
    return this.http.get(this.endpoint + `getBannerByLocationId/${locationId}`);
  }

  createBanner(formData: FormData): Observable<any> {
    return this.http.post(this.endpoint + `createBanner`, formData);
  }

  getBannerById(id: number) {
    return this.http.get(this.endpoint + `getBannerById/${id}`);
  }

}
