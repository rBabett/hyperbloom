import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {GardenService} from "../garden.service";
import {Router} from "@angular/router";
import {Cell, Garden, MyGardensComponent, Seed} from "../my-gardens/my-gardens.component";
import {Plant} from "../my-plants/my-plants.component";
import {PlantService} from "../plant.service";
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-garden-details',
  templateUrl: './garden-details.component.html',
  styleUrls: ['./garden-details.component.css']
})
export class GardenDetailsComponent implements OnInit{
  public garden: Garden;
  public id: number = 0;
  public name: string = "";
  public columns: number = 0;
  public rows: number = 0;
  public cells: Cell[] = [];
  public plants: Seed[] | undefined;
  public selectedPlant: Seed | null | undefined;
  public previousPlants: PlantInCell[] = [];
  public newPlants: PlantInCell[] = [];

  public today: Date = new Date();
  public yesterday = new Date();

  private http: HttpClient;
  private baseUrl: string;
  private router: Router;

  newCellsForm = this.formBuilder.group({
    cells: [],
  });

  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private formBuilder: FormBuilder,
              private Router: Router,
              private route: ActivatedRoute,
              public gardenService: GardenService,
              private plantService: PlantService) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.router = Router;
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;
    this.yesterday.setDate(this.yesterday.getDate() - 1);

    this.getSeeds();

    this.getGardenById(id);
  }

  getSeeds() {
    this.plantService.getSeeds().subscribe(res => {
      const plants = res.sort((a, b) => a.seedId < b.seedId ? -1 : a.seedId > b.seedId ? 1 : 0)
      this.gardenService.getCells().subscribe(res => {
        this.plants = plants.filter((value, index, self) =>
          index === self.findIndex((t) => (
            t.name === value.name
          )))
      })});
  }
  getGardenById(id: number) {
    this.gardenService.getGardenById(id).subscribe(result => {
      this.id = result.gardenId
      this.garden = result;
      this.name = result.name;
      this.columns = result.columns;
      this.rows = result.rows;
      this.cells = result.cells;
      for(let cell of result.cells) {
        cell.showDetails = false;
        this.previousPlants.push({
          cellId: cell.cellId,
          plant: cell.plant
        })
      }
      console.log(this.cells);
    }, error => console.error(error));
  }

  onSelect(plant: any): void {
    this.selectedPlant = plant;
  }

  sowSeed(cell: any, plant: any): void {
    cell.plant = plant;
  }
  waterCell(cell: Cell, gardenId: number): void {
    this.gardenService.waterCell(cell.cellId, gardenId);
  }

  fertilizeCell(cell: Cell, gardenId: number): void {
    this.gardenService.fertilizeCell(cell.cellId, gardenId);
  }
  onSubmit(id: number) {
    const cellsData = []

    for(let cell of this.cells) {
      let prevPlant = this.previousPlants.find(p => p.cellId == cell.cellId);
      if (cell.plant?.name == prevPlant?.plant?.name) {
        continue;
      }
        let formData = {
          CellId: cell.cellId,
          GardenId: cell.gardenId,
          ColumnPosition: cell.columnPosition,
          RowPosition: cell.rowPosition,
          WateredDate: cell.wateredDate,
          FertilizedDate: cell.fertilizedDate,
          Plant: {
            SeedId: cell.plant?.seedId,
            Name: cell.plant?.name,
            Color: cell.plant?.color
          }
        }
        cellsData.push(formData);
      }

    this.gardenService.updateGardenCells(id, cellsData);
    console.log(this.cells);
  }

  protected readonly formatDate = formatDate;
  protected readonly Date = Date;
}

export interface PlantInCell {
  cellId: number,
  plant: Seed | null
}
