import {Inject, Injectable} from '@angular/core';
import { Plant } from './my-plants/my-plants.component';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {getBaseUrl} from "../main";
import {Router} from "@angular/router";
import { Needs } from "./my-plants/my-plants.component";
import {Seed} from "./my-gardens/my-gardens.component";
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
    return this.Http.get<Plant[]>(getBaseUrl() + 'api/plants');
  }

  getSeeds(): Observable<Seed[]> {
    return this.Http.get<Seed[]>(getBaseUrl() + 'api/plants/seeds')
  }

  getNeeds(): Observable<Needs[]> {
    return this.Http.get<Needs[]>(getBaseUrl() + 'api/needs');
  }
  getPlantById(id: number): Observable<Plant> {
    return this.Http.get<Plant>(getBaseUrl() + 'api/plants/' + id);
  }

  deletePlant(id: number) {
    this.Http.delete(getBaseUrl() + 'api/plants/' + id).subscribe(
      (data) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['my-plants']);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      });
  }

  updatePlant(id: number, formData: {
    WaterNeeds: string | null | undefined;
    SoilNeeds: string | null | undefined;
    LightNeeds: string | null | undefined;
    Name: string | null | undefined
  }) {
    this.Http.put<Plant>(getBaseUrl() + 'api/plants/' + id, formData).subscribe(
      () => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['my-plants']);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      });
  }

  addNewPlant(formData: {
    WaterNeeds: string | null | undefined;
    Color: string | null | undefined;
    SoilNeeds: string | null | undefined;
    LightNeeds: string | null | undefined;
    Name: string | null | undefined
  }) {
    this.Http.post<Plant>(getBaseUrl() + 'api/plants/add-new-plant', formData).subscribe(
      (data) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['my-plants']);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      });
  }

  waterPlant(id: number) {
    this.Http.put(getBaseUrl() + 'api/plants/' + id + '/water', {}).subscribe(
      () => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['my-plants']);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      });
  }

  fertilizePlant(id: number) {
    this.Http.put(getBaseUrl() + 'api/plants/' + id + '/fertilize', {}).subscribe(
      () => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['my-plants']);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      });
  }
}
