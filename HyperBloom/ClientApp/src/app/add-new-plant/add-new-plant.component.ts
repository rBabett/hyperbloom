import { Component, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-new-plant',
  templateUrl: './add-new-plant.component.html'
})
export class AddNewPlantComponent {
  public needs: Needs[] = [];
  public soilNeeds: Needs[] = [];
  public waterNeeds: Needs[] = [];
  public lightNeeds: Needs[] = [];

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
              private Router: Router) {
    http.get<Needs[]>(baseUrl + 'api/needs').subscribe(result => {
      this.needs = result;
      this.soilNeeds = this.needs.filter(need => need.type == 0);
      this.waterNeeds = this.needs.filter(need => need.type == 1);
      this.lightNeeds = this.needs.filter(need => need.type == 2);
    }, error => console.error(error));
    this.http = http;
    this.baseUrl = baseUrl;
    this.router = Router;
  }

  onSubmit(): void {
    console.log(this.newPlantForm);

    const formData = {
      Name: this.newPlantForm.get('name')?.value,
      Abbreviation: this.newPlantForm.get('abbreviation')?.value,
      LightNeeds: this.newPlantForm.get('lightNeeds')?.value,
      WaterNeeds: this.newPlantForm.get('waterNeeds')?.value,
      SoilNeeds: this.newPlantForm.get('soilNeeds')?.value
    };

    this.http.post<Plant>(this.baseUrl + 'api/plants/add-new-plant', formData).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    })

    this.router.navigate(['/my-plants']);
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
