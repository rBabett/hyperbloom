import {Inject, Injectable} from '@angular/core';
import { Plant } from './my-plants/my-plants.component';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {getBaseUrl} from "../main";
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private Http: HttpClient;
  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private router: Router) {
    this.Http = http;
  }

  getPlants(): Observable<Plant[]> {
    return this.Http.get<Plant[]>(getBaseUrl() + 'api/plants')
  }

  deletePlant(id: number) {
    this.Http.delete(getBaseUrl() + 'api/plants/' + id).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    })
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['my-plants']);
      });
  }
}
