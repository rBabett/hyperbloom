import {Component, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {getBaseUrl} from "../../main";
import {Router} from "@angular/router";
import { PlantService } from "../plant.service";
import {formatDate, NgIf} from "@angular/common";
import {Cell} from "../my-gardens/my-gardens.component";
import {GardenService} from "../garden.service";

@Component({
  selector: 'app-my-plants',
  templateUrl: './my-plants.component.html',
  styleUrls: [ './my-plants.component.css' ]
})
export class MyPlantsComponent implements OnInit {
  public plants: Plant[] = [];
  public cells: Cell[] = [];
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

    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  ngOnInit() {
    this.GetCells();
    this.GetPlants()
  }

  private GetCells() {
    this.gardenService.getCells().subscribe(res =>
    this.cells = res)
  }
  private GetPlants() {
    this.plantService.getPlants().subscribe(res => {
    const plants = res.sort((a, b) => a.plantId < b.plantId ? -1 : a.plantId > b.plantId ? 1 : 0)
      this.gardenService.getCells().subscribe(res => {
        this.cells = res
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
}

export interface Needs {
  name: string;
  type: number;
}
