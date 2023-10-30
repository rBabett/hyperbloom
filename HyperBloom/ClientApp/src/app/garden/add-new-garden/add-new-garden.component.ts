import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {GardenService} from "../../services/garden.service";

@Component({
  selector: 'app-add-new-garden',
  templateUrl: './add-new-garden.component.html',
  styleUrls: ['./add-new-garden.component.css']
})
export class AddNewGardenComponent {
  public name: string | undefined;
  public columns: number | undefined;
  public rows: number | undefined;

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
    this.http = http;
    this.baseUrl = baseUrl;
    this.router = Router;
  }

  onSubmit(): void {

    const formData = {
      Name: this.newGardenForm.get('name')?.value,
      Columns: this.newGardenForm.get('columns')?.value,
      Rows: this.newGardenForm.get('rows')?.value,
    };

    this.gardenService.addNewGarden(formData);
  }

}
