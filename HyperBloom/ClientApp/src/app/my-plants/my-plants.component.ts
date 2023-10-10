import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {getBaseUrl} from "../../main";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-plants',
  templateUrl: './my-plants.component.html'
})
export class MyPlantsComponent {
  public plants: Plant[] = [];
  private http: HttpClient;
  private router: Router;
  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private Router: Router) {
    http.get<Plant[]>(baseUrl + 'api/plants').subscribe(result => {
      this.plants = result;
    }, error => console.error(error));
    this.http = http;
    this.router = Router;
  }

  public DeletePlant(id: number) {
    this.http.delete(getBaseUrl() + 'api/plants/' + id).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    })
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['my-plants']);
      });
  }

  public UpdatePlant(id: number) {
    this.router.navigate(['my-plants/' + id]);
  }
}

interface Plant {
  id: number;
  name: string;
  abbreviation: string;
  lightNeeds: string;
  waterNeeds: string;
  soilNeeds: string;
}
