import {Component, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { PlantService } from "../../services/plant.service";
import {formatDate, NgIf} from "@angular/common";
import {GardenService} from "../../services/garden.service";

@Component({
  selector: 'app-my-plants',
  templateUrl: './my-plants.component.html',
  styleUrls: [ './my-plants.component.css' ]
})
export class MyPlantsComponent implements OnInit {
  public plants: Plant[] = [];
  private http: HttpClient;
  private router: Router;

  public today: Date = new Date();
  public yesterday = new Date();


  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private Router: Router,
              private plantService: PlantService,
              private gardenService: GardenService) {
    this.http = http;
    this.router = Router;
  }

  ngOnInit() {
    this.GetPlants()
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }
  private GetPlants() {
    this.plantService.getPlants().subscribe(res => {
    const plants = res.sort((a, b) => a.plantId < b.plantId ? -1 : a.plantId > b.plantId ? 1 : 0)
      this.gardenService.getCells().subscribe(res => {
        this.plants = plants
      })});
  }
  public DeletePlant(id: number) {
    this.plantService.deletePlant(id);
  }

  public UpdatePlant(id: number) {
    this.router.navigate(['my-plants/' + id]);
  }

  public WaterPlant(id: number) {
    this.plantService.waterPlant(id);
  }

  public FertilizePlant(id: number) {
    this.plantService.fertilizePlant(id);
  }

  protected readonly formatDate = formatDate;
  protected readonly Date = Date;
}

export interface Plant {
  plantId: number;
  name: string;
  lightNeeds: string;
  waterNeeds: string;
  soilNeeds: string;
  wateredDate: Date;
  fertilizedDate: Date;
  color: string;
  expectedHarvestAmount: number;
  actualHarvestAmount: number;
  lowerTemp: number;
  higherTemp: number;
  tempUnit: string;
  harvestUnit: string;
}

export interface Needs {
  name: string;
  type: number;
}

export interface Unit {
  name: string;
}
