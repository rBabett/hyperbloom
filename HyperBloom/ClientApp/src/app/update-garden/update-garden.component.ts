import {Component, Inject} from '@angular/core';
import {Plant} from "../my-plants/my-plants.component";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {PlantService} from "../plant.service";
import {GardenService} from "../garden.service";
import {Cell} from "../my-gardens/my-gardens.component";

@Component({
  selector: 'app-update-garden',
  templateUrl: './update-garden.component.html',
  styleUrls: ['./update-garden.component.css']
})
export class UpdateGardenComponent {
  public id: number;
  public name: string | undefined;
  public columns: number | undefined;
  public rows: number | undefined;
  public cells: Cell[] | undefined;

  private http: HttpClient;
  private baseUrl: string;
  private router: Router;

  newGardenForm = this.formBuilder.group({
    name: '',
    columns: 0,
    rows: 0,
  });
  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private formBuilder: FormBuilder,
              private Router: Router,
              private route: ActivatedRoute,
              private gardenService: GardenService) {

    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;

    this.gardenService.getGardenById(id).subscribe(result => {
      this.id = result.gardenId
      this.name = result.name;
      this.columns = result.columns;
      this.rows = result.rows;
      this.cells = result.cells;
    }, error => console.error(error));

    this.http = http;
    this.baseUrl = baseUrl;
    this.router = Router;
  }

  onSubmit(id: number): void {

    const formData = {
      Name: this.newGardenForm.get('name')?.value,
      Columns: this.newGardenForm.get('columns')?.value,
      Rows: this.newGardenForm.get('rows')?.value,
      Cells: this.cells,
    };
    this.gardenService.updateGarden(id, formData);
  }
}
