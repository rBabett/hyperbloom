import {Component, Inject, OnInit} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import {Needs, Unit} from "../my-plants/my-plants.component";
import {PlantService} from "../../services/plant.service";
import {getBaseUrl} from "../../../main";

@Component({
  selector: 'app-add-new-plant',
  templateUrl: './add-new-plant.component.html'
})
export class AddNewPlantComponent implements OnInit{
  public needs: Needs[] = [];
  public soilNeeds: Needs[] = [];
  public waterNeeds: Needs[] = [];
  public lightNeeds: Needs[] = [];
  public harvestUnits: Unit[] = [];
  public tempUnits: Unit[] = [];

  private http: HttpClient;
  private baseUrl: string;
  private router: Router;

  newPlantForm = this.formBuilder.group({
    name: '',
    lightNeeds: '',
    waterNeeds: '',
    soilNeeds: '',
    color: '',
    expectedHarvestAmount: 0,
    actualHarvestAmount: 0,
    lowerTemp: 0,
    higherTemp: 0,
    tempUnit: '',
    harvestUnit: '',
  });

  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private formBuilder: FormBuilder,
              private Router: Router,
              private plantService: PlantService) {

    this.http = http;
    this.baseUrl = baseUrl;
    this.router = Router;
  }

  ngOnInit(): void {
    this.GetNeeds();
    this.GetUnits();
    this.GetTempUnits();
  }

  private GetUnits() {
    this.http.get<Unit[]>(getBaseUrl() + 'api/units').subscribe(result => {
      this.harvestUnits = result;
    }, error => console.error(error));
  }
  private GetTempUnits() {
    this.http.get<Unit[]>(getBaseUrl() + 'api/units/temp').subscribe(result => {
      this.tempUnits = result;
    }, error => console.error(error));
  }
  private GetNeeds() {
    this.http.get<Needs[]>(getBaseUrl() + 'api/needs').subscribe(result => {
      this.needs = result;
      this.soilNeeds = this.needs.filter(need => need.type == 0);
      this.waterNeeds = this.needs.filter(need => need.type == 1);
      this.lightNeeds = this.needs.filter(need => need.type == 2);
    }, error => console.error(error));
  }

  onSubmit(): void {

    const formData = {
      Name: this.newPlantForm.get('name')?.value,
      LightNeeds: this.newPlantForm.get('lightNeeds')?.value,
      WaterNeeds: this.newPlantForm.get('waterNeeds')?.value,
      SoilNeeds: this.newPlantForm.get('soilNeeds')?.value,
      Color: this.newPlantForm.get('color')?.value,
      ExpectedHarvestAmount: this.newPlantForm.get('expectedHarvestAmount')?.value,
      LowerTemp: this.newPlantForm.get('lowerTemp')?.value,
      HigherTemp: this.newPlantForm.get('higherTemp')?.value,
      HarvestUnit: this.newPlantForm.get('harvestUnit')?.value,
      TempUnit: this.newPlantForm.get('tempUnit')?.value,
    };
    this.plantService.addNewPlant(formData);
  }
}

