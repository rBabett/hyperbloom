import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {SeedService} from "../seed.service";
import {Seed} from "../my-gardens/my-gardens.component";

@Component({
  selector: 'app-update-seed',
  templateUrl: './update-seed.component.html',
  styleUrls: ['./update-seed.component.css']
})
export class UpdateSeedComponent implements OnInit{

  public id: number;
  public seed: Seed | undefined;
  public name: string | undefined;
  public color: string | undefined;

  private http: HttpClient;
  private baseUrl: string;
  private router: Router;

  newSeedForm = this.formBuilder.group({
    name: '',
    color: '',
  });
  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private formBuilder: FormBuilder,
              private Router: Router,
              private route: ActivatedRoute,
              private seedService: SeedService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.http = http;
    this.baseUrl = baseUrl;
    this.router = Router;
  }

  ngOnInit(): void {
    this.seedService.getSeedById(this.id).subscribe(result => {
      this.seed = result;
      this.name = result.name;
      this.color = result.color;
    }, error => console.error(error));
  }

  onSubmit(id: number): void {

    const formData = {
      Name: this.newSeedForm.get('name')?.value,
      Color: this.newSeedForm.get('color')?.value,
    };
    this.seedService.updateSeed(id, formData);
  }

}
