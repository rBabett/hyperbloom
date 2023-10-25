import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {Needs, Plant} from "../my-plants/my-plants.component";
import {Seed} from "../my-gardens/my-gardens.component";
import {SeedService} from "../seed.service";

@Component({
  selector: 'app-add-new-seed',
  templateUrl: './add-new-seed.component.html',
  styleUrls: ['./add-new-seed.component.css']
})
export class AddNewSeedComponent {

  private http: HttpClient;
  private baseUrl: string;
  private router: Router;

  newSeedForm = this.formBuilder.group({
    name: '',
    color: '',
  })
  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private formBuilder: FormBuilder,
              private Router: Router,
              private seedService: SeedService) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.router = Router;
  }
  onSubmit(): void {

    const formData = {
      Name: this.newSeedForm.get('name')?.value,
      Color: this.newSeedForm.get('color')?.value
    };

    this.seedService.addNewSeed(formData);
  }
}
