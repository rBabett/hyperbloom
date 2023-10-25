import {Component, Inject} from '@angular/core';
import {Plant} from "../my-plants/my-plants.component";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {PlantService} from "../plant.service";
import {GardenService} from "../garden.service";
import {formatDate, NgIf} from "@angular/common";

@Component({
  selector: 'app-my-gardens',
  templateUrl: './my-gardens.component.html',
  styleUrls: ['./my-gardens.component.css']
})
export class MyGardensComponent {

  public gardens: Garden[] = [];
  private http: HttpClient;
  private router: Router;
  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private Router: Router,
              public gardenService: GardenService) {
    this.http = http;
    this.router = Router;
  }

  ngOnInit() {
    this.getGardens();
  }

  private getGardens() {
    this.gardenService.getGardens().subscribe(res => {
      this.gardens = res.sort((a, b) => a.gardenId < b.gardenId ? -1 : a.gardenId > b.gardenId ? 1 : 0)
    });
  }
  public DeletePlant(id: number) {
    this.gardenService.deleteGarden(id);
  }

  public UpdatePlant(id: number) {
    this.router.navigate(['my-gardens/' + id]);
  }

  public ViewGardenDetails(id: number) {
    this.router.navigate(['garden-details/' + id])
  }

  public WaterPlant(id: number) {
    this.gardenService.waterCell(id);
  }

  public FertilizePlant(id: number) {
    this.gardenService.fertilizeCell(id);
  }

  protected readonly formatDate = formatDate;

}
export interface Garden {
  gardenId: number;
  name: string;
  columns: number;
  rows: number;
  cells: Cell[];
}

export interface Cell {
  showDetails: boolean;
  cellId: number;
  gardenId: number;
  columnPosition: number;
  rowPosition: number;
  plant: Seed | null;
  estimatedHarvest: number;
  actualHarvest: number;
  wateredDate: Date;
  fertilizeDate: Date;
}

export interface Seed {
  seedId: number;
  name: string;
  color: string;
}
