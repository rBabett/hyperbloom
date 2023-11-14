import {Component, Inject, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {PlantService} from "../../services/plant.service";
import {Needs, Plant, Unit} from "../my-plants/my-plants.component";
import {getBaseUrl} from "../../../main";

@Component({
  selector: 'app-update-plant',
  templateUrl: './update-plant.component.html'
})
export class UpdatePlantComponent implements OnInit {
  public needs: Needs[] = [];
  public soilNeeds: Needs[] = [];
  public waterNeeds: Needs[] = [];
  public lightNeeds: Needs[] = [];
  public harvestUnits: Unit[] = [];
  public tempUnits: Unit[] = [];

  public id: number;
  public plant: Plant | undefined;
  public name: string | undefined;
  public plantLight: string | undefined;
  public plantWater: string | undefined;
  public plantSoil: string | undefined;
  public color: string | undefined;
  public expectedHarvestAmount: number | undefined;
  public actualHarvestAmount: number | undefined;
  public lowerTemp: number | undefined;
  public higherTemp: number | undefined;
  public tempUnit: string | undefined;
  public harvestUnit: string | undefined;

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
              private route: ActivatedRoute,
              private plantservice: PlantService) {

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.http = http;
    this.baseUrl = baseUrl;
    this.router = Router;
  }

  ngOnInit(): void {
    this.GetNeeds();
    this.GetPlantData();
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

  GetPlantData() {
    this.plantservice.getPlantById(this.id).subscribe(result => {
      this.plant = result;
      this.name = result.name;
      this.plantLight = result.lightNeeds;
      this.plantSoil = result.soilNeeds;
      this.plantWater = result.waterNeeds;
      this.color = result.color;
      this.expectedHarvestAmount = result.expectedHarvestAmount;
      this.actualHarvestAmount = result.actualHarvestAmount;
      this.lowerTemp = result.lowerTemp;
      this.higherTemp = result.higherTemp;
      this.harvestUnit = result.harvestUnit;
      this.tempUnit = result.tempUnit;
    }, error => console.error(error));
  }

  GetNeeds() {
    this.plantservice.getNeeds().subscribe(result => {
      this.needs = result;
      this.soilNeeds = this.needs.filter(need => need.type == 0);
      this.waterNeeds = this.needs.filter(need => need.type == 1);
      this.lightNeeds = this.needs.filter(need => need.type == 2);
    }, error => console.error(error));
  }
  onSubmit(id: number): void {

    const formData = {
      Name: this.newPlantForm.get('name')?.value,
      LightNeeds: this.newPlantForm.get('lightNeeds')?.value,
      WaterNeeds: this.newPlantForm.get('waterNeeds')?.value,
      SoilNeeds: this.newPlantForm.get('soilNeeds')?.value,
      Color: this.newPlantForm.get('color')?.value,
      ExpectedHarvestAmount: this.newPlantForm.get('expectedHarvestAmount')?.value,
      ActualHarvestAmount: this.newPlantForm.get('actualHarvestAmount')?.value,
      LowerTemp: this.newPlantForm.get('lowerTemp')?.value,
      HigherTemp: this.newPlantForm.get('higherTemp')?.value,
      HarvestUnit: this.newPlantForm.get('harvestUnit')?.value,
      TempUnit: this.newPlantForm.get('tempUnit')?.value,
    };
    this.plantservice.updatePlant(id, formData);
  }
}
