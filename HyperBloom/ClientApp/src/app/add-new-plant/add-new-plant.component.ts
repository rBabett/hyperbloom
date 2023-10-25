import {Component, Inject, OnInit} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { Plant } from "../my-plants/my-plants.component";
import { Needs } from "../my-plants/my-plants.component";
import {PlantService} from "../plant.service";
import {getBaseUrl} from "../../main";

@Component({
  selector: 'app-add-new-plant',
  templateUrl: './add-new-plant.component.html'
})
export class AddNewPlantComponent implements OnInit{
  public needs: Needs[] = [];
  public soilNeeds: Needs[] = [];
  public waterNeeds: Needs[] = [];
  public lightNeeds: Needs[] = [];

  private http: HttpClient;
  private baseUrl: string;
  private router: Router;

  newPlantForm = this.formBuilder.group({
    name: '',
    lightNeeds: '',
    waterNeeds: '',
    soilNeeds: '',
    color: '',
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
    };
    this.plantService.addNewPlant(formData);
  }
}

