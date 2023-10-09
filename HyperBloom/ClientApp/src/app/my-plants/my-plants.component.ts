import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './my-plants.component.html'
})
export class MyPlantsComponent {
  public plants: Plant[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Plant[]>(baseUrl + 'api/plants').subscribe(result => {
      this.plants = result;
      console.log(this.plants);
    }, error => console.error(error));
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
