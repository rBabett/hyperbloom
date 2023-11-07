import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {SeedService} from "../../services/seed.service";
import {Seed} from "../../garden/my-gardens/my-gardens.component";
import {Needs, Plant, Unit} from "../../plant/my-plants/my-plants.component";
import {getBaseUrl} from "../../../main";
import {PlantService} from "../../services/plant.service";

@Component({
  selector: 'app-update-seed',
  templateUrl: './update-seed.component.html',
  styleUrls: ['./update-seed.component.css']
})
export class UpdateSeedComponent implements OnInit {

  public needs: Needs[] = [];
  public soilNeeds: Needs[] = [];
  public waterNeeds: Needs[] = [];
  public lightNeeds: Needs[] = [];
  public harvestUnits: Unit[] = [];
  public tempUnits: Unit[] = [];

  public id: number;
  public seed: Seed | undefined;
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

  newSeedForm = this.formBuilder.group({
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
              private seedService: SeedService,
              private plantService: PlantService) {
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
    this.seedService.getSeedById(this.id).subscribe(result => {
      this.seed = result;
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
    this.plantService.getNeeds().subscribe(result => {
      this.needs = result;
      this.soilNeeds = this.needs.filter(need => need.type == 0);
      this.waterNeeds = this.needs.filter(need => need.type == 1);
      this.lightNeeds = this.needs.filter(need => need.type == 2);
    }, error => console.error(error));
  }

  onSubmit(id: number): void {
    const formData = {
      Name: this.newSeedForm.get('name')?.value,
      LightNeeds: this.newSeedForm.get('lightNeeds')?.value,
      WaterNeeds: this.newSeedForm.get('waterNeeds')?.value,
      SoilNeeds: this.newSeedForm.get('soilNeeds')?.value,
      Color: this.newSeedForm.get('color')?.value,
      ExpectedHarvestAmount: this.newSeedForm.get('expectedHarvestAmount')?.value,
      ActualHarvestAmount: this.newSeedForm.get('actualHarvestAmount')?.value,
      LowerTemp: this.newSeedForm.get('lowerTemp')?.value,
      HigherTemp: this.newSeedForm.get('higherTemp')?.value,
      HarvestUnit: this.newSeedForm.get('harvestUnit')?.value,
      TempUnit: this.newSeedForm.get('tempUnit')?.value,
    };
    this.seedService.updateSeed(id, formData);
  }

}
