import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {GardenService} from "../garden.service";
import {Router} from "@angular/router";
import {Cell, Garden, MyGardensComponent} from "../my-gardens/my-gardens.component";
import {Plant} from "../my-plants/my-plants.component";
import {PlantService} from "../plant.service";


@Component({
  selector: 'app-garden-details',
  templateUrl: './garden-details.component.html',
  styleUrls: ['./garden-details.component.css']
})
export class GardenDetailsComponent {
  public garden: Garden | undefined;
  public id: number;
  public name: string | undefined;
  public columns: number | undefined;
  public rows: number | undefined;
  public cells: Cell[] = [];
  public plants: Plant[] | undefined;
  public selectedPlant: Plant | null | undefined;

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

    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;

    plantService.getPlants().subscribe(res => {
      this.plants = res.sort((a, b) => a.plantId < b.plantId ? -1 : a.plantId > b.plantId ? 1 : 0)
    })

    this.gardenService.getGardenById(id).subscribe(result => {
      this.id = result.gardenId
      this.garden = result;
      this.name = result.name;
      this.columns = result.columns;
      this.rows = result.rows;
      this.cells = result.cells;
    }, error => console.error(error));

    this.http = http;
    this.baseUrl = baseUrl;
    this.router = Router;
  }

  onSelect(plant: any): void {
    this.selectedPlant = plant;
  }

  sowSeed(cell: any, plant: any): void {
    cell.plant = plant;
  }

  protected readonly MyGardensComponent = MyGardensComponent;

  onSubmit(id: number) {
    const cellsData = []

    for(let cell of this.cells) {
      if (cell.plant) {
        let formData = {
          CellId: cell.cellId,
          GardenId: cell.gardenId,
          ColumnPosition: cell.columnPosition,
          RowPosition: cell.rowPosition,
          Plant: {
            PlantId: cell.plant?.plantId,
            Name: cell.plant?.name,
            LightNeeds: cell.plant?.lightNeeds,
            WaterNeeds: cell.plant?.waterNeeds,
            SoilNeeds: cell.plant?.soilNeeds,
            WateredDate: cell.plant?.wateredDate,
            FertilizedDate: cell.plant?.fertilizedDate,
            Color: cell.plant?.color
          }
        }
        cellsData.push(formData);
      }
    }

    this.gardenService.updateGardenCells(id, cellsData);
    console.log(this.cells);
  }
}
