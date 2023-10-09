import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-plants',
  templateUrl: './my-plants.component.html'
})
export class MyPlantsComponent {
  public plants: Plant[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Plant[]>(baseUrl + 'api/plants').subscribe(result => {
      this.plants = result;
    }, error => console.error(error));
  }
}

interface Plant {
  name: string;
  abbreviation: string;
  lightNeeds: string;
  waterNeeds: string;
  soilNeeds: string;
}
