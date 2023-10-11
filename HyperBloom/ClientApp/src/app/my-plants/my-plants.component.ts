import {Component, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {getBaseUrl} from "../../main";
import {Router} from "@angular/router";
import { PlantService } from "../plant.service";

@Component({
  selector: 'app-my-plants',
  templateUrl: './my-plants.component.html'
})
export class MyPlantsComponent implements OnInit {
  public plants: Plant[] = [];
  private http: HttpClient;
  private router: Router;
  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private Router: Router,
              private plantService: PlantService) {
    this.http = http;
    this.router = Router;
  }

  ngOnInit() {
    this.GetPlant();
  }

  private GetPlant() {
    this.plantService.getPlants().subscribe(res =>
    this.plants = res);
  }
  public DeletePlant(id: number) {
    this.plantService.deletePlant(id);
  }

  public UpdatePlant(id: number) {
    this.router.navigate(['my-plants/' + id]);
  }

  public WaterPlant(id: number) {
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['my-plants']);
      });
  }

  public FertilizePlant(id: number) {
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['my-plants']);
      });
  }
}

export interface Plant {
  id: number;
  name: string;
  abbreviation: string;
  lightNeeds: string;
  waterNeeds: string;
  soilNeeds: string;
  wateredDate: Date;
  fertilizedDate: Date;
}

export interface Needs {
  name: string;
  type: number;
}
