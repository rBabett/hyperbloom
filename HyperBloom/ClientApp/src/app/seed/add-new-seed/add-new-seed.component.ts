import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {SeedService} from "../../services/seed.service";
import {Needs, Unit} from "../../plant/my-plants/my-plants.component";
import {getBaseUrl} from "../../../main";

@Component({
  selector: 'app-add-new-seed',
  templateUrl: './add-new-seed.component.html',
  styleUrls: ['./add-new-seed.component.css']
})
export class AddNewSeedComponent implements OnInit {

  public needs: Needs[] = [];
  public soilNeeds: Needs[] = [];
  public waterNeeds: Needs[] = [];
  public lightNeeds: Needs[] = [];
  public harvestUnits: Unit[] = [];
  public tempUnits: Unit[] = [];
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
              private seedService: SeedService) {
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
      Name: this.newSeedForm.get('name')?.value,
      LightNeeds: this.newSeedForm.get('lightNeeds')?.value,
      WaterNeeds: this.newSeedForm.get('waterNeeds')?.value,
      SoilNeeds: this.newSeedForm.get('soilNeeds')?.value,
      Color: this.newSeedForm.get('color')?.value,
      ExpectedHarvestAmount: this.newSeedForm.get('expectedHarvestAmount')?.value,
      LowerTemp: this.newSeedForm.get('lowerTemp')?.value,
      HigherTemp: this.newSeedForm.get('higherTemp')?.value,
      HarvestUnit: this.newSeedForm.get('harvestUnit')?.value,
      TempUnit: this.newSeedForm.get('tempUnit')?.value,
    };

    this.seedService.addNewSeed(formData);
  }
}
