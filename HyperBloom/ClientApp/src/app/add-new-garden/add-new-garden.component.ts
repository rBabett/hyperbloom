import {Component, Inject} from '@angular/core';
import {Cell} from "../my-gardens/my-gardens.component";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {GardenService} from "../garden.service";
import {Plant} from "../my-plants/my-plants.component";

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
    this.http.post<Plant>(this.baseUrl + 'api/gardens/add-new-garden', formData).subscribe(
      (data) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['my-gardens']);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      });
  }

}
