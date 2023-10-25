import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Needs, Plant} from "./my-plants/my-plants.component";
import {getBaseUrl} from "../main";
import {Seed} from "./my-gardens/my-gardens.component";

@Injectable({
  providedIn: 'root'
})
export class SeedService {
  private Http: HttpClient;
  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private router: Router) {
    this.Http = http;
  }

  getSeeds(): Observable<Seed[]> {
    return this.Http.get<Seed[]>(getBaseUrl() + 'api/seeds');
  }
  getSeedById(id: number): Observable<Seed> {
    return this.Http.get<Seed>(getBaseUrl() + 'api/seeds/' + id);
  }

  deleteSeed(id: number) {
    this.Http.delete(getBaseUrl() + 'api/seeds/' + id).subscribe(
      (data) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['my-seeds']);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      });
  }

  addNewSeed(formData: { Color: string | null | undefined; Name: string | null | undefined }) {
    this.Http.post<Seed>(getBaseUrl() + 'api/seeds/add-new-seed', formData).subscribe(
      (data) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['my-seeds']);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      });
  }

  updateSeed(id: number, formData: { Color: string | null | undefined; Name: string | null | undefined }) {
    this.Http.put<Seed>(getBaseUrl() + 'api/seeds/' + id, formData).subscribe(
      () => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['my-seeds']);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      });
  }
}
