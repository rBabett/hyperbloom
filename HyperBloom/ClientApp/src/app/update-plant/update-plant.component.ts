import { Component, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-update-plant',
  templateUrl: './update-plant.component.html'
})
export class UpdatePlantComponent {
  public needs: Needs[] = [];
  public soilNeeds: Needs[] = [];
  public waterNeeds: Needs[] = [];
  public lightNeeds: Needs[] = [];

  public id: number;
  public plant: Plant | undefined;
  public name: string | undefined;
  public abbreviation: string | undefined;
  public plantLight: string | undefined;
  public plantWater: string | undefined;
  public plantSoil: string | undefined;

  private http: HttpClient;
  private baseUrl: string;
  private router: Router;

  newPlantForm = this.formBuilder.group({
    name: '',
    abbreviation: '',
    lightNeeds: '',
    waterNeeds: '',
    soilNeeds: '',
  });
  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private formBuilder: FormBuilder,
              private Router: Router,
              private route: ActivatedRoute) {
    http.get<Needs[]>(baseUrl + 'api/needs').subscribe(result => {
      this.needs = result;
      this.soilNeeds = this.needs.filter(need => need.type == 0);
      this.waterNeeds = this.needs.filter(need => need.type == 1);
      this.lightNeeds = this.needs.filter(need => need.type == 2);
    }, error => console.error(error));
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;
    http.get<Plant>(baseUrl + 'api/plants/' + id).subscribe(result => {
      this.plant = result;
      this.name = result.name;
      this.abbreviation = result.abbreviation;
      this.plantLight = result.lightNeeds;
      this.plantSoil = result.soilNeeds;
      this.plantWater = result.waterNeeds;
    }, error => console.error(error));
    this.http = http;
    this.baseUrl = baseUrl;
    this.router = Router;
  }

  onSubmit(id: number): void {
    console.log(this.newPlantForm);

    const formData = {
      Name: this.newPlantForm.get('name')?.value,
      Abbreviation: this.newPlantForm.get('abbreviation')?.value,
      LightNeeds: this.newPlantForm.get('lightNeeds')?.value,
      WaterNeeds: this.newPlantForm.get('waterNeeds')?.value,
      SoilNeeds: this.newPlantForm.get('soilNeeds')?.value
    };

    this.http.put<Plant>(this.baseUrl + 'api/plants/' + id, formData).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    })

    setTimeout(()=>{this.router.navigate(['/my-plants'])}, 100);
  }
}

interface Needs {
  name: string;
  type: number;
}

interface Plant {
  name: string;
  abbreviation: string;
  lightNeeds: string;
  waterNeeds: string;
  soilNeeds: string;
}