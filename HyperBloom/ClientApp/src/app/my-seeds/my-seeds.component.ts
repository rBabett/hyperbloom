import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Seed} from "../my-gardens/my-gardens.component";
import {SeedService} from "../seed.service";

@Component({
  selector: 'app-my-seeds',
  templateUrl: './my-seeds.component.html',
  styleUrls: ['./my-seeds.component.css']
})
export class MySeedsComponent implements OnInit {
  public seeds: Seed[] = [];
  private http: HttpClient;
  private router: Router;

  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private Router: Router,
              private seedService: SeedService) {
    this.http = http;
    this.router = Router;
  }

  ngOnInit() {
    this.GetSeeds()
  }
  private GetSeeds() {
    let seeds: Seed[] = [];
    this.seedService.getSeeds().subscribe(res => {
      seeds = res.sort((a, b) => a.seedId < b.seedId ? -1 : a.seedId > b.seedId ? 1 : 0);
    })
    this.seeds = seeds.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.name === value.name
      )))

  }
  public DeleteSeed(id: number) {
    this.seedService.deleteSeed(id);
  }

  public UpdateSeed(id: number) {
    this.router.navigate(['my-seeds/' + id]);
  }


}
