import {Inject, Injectable} from '@angular/core';
import { Plant } from './my-plants/my-plants.component';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private Http: HttpClient;
  private BaseUrl: string;
  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.Http = http;
    this.BaseUrl = baseUrl;
  }

  getPlants(): Observable<Plant[]> {
    return this.Http.get<Plant[]>(this.BaseUrl + 'api/plants')
  }
}
