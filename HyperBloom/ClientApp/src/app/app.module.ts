import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { MyPlantsComponent } from './my-plants/my-plants.component';
import { AddNewPlantComponent } from "./add-new-plant/add-new-plant.component";
import { UpdatePlantComponent } from "./update-plant/update-plant.component";
import { MyGardensComponent } from "./my-gardens/my-gardens.component";
import {UpdateGardenComponent} from "./update-garden/update-garden.component";
import {AddNewGardenComponent} from "./add-new-garden/add-new-garden.component";
import {GardenDetailsComponent} from "./garden-details/garden-details.component";
import {MySeedsComponent} from "./my-seeds/my-seeds.component";
import {UpdateSeedComponent} from "./update-seed/update-seed.component";
import {AddNewSeedComponent} from "./add-new-seed/add-new-seed.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    MyPlantsComponent,
    AddNewPlantComponent,
    UpdatePlantComponent,
    MyGardensComponent,
    UpdateGardenComponent,
    AddNewGardenComponent,
    GardenDetailsComponent,
    MySeedsComponent,
    UpdateSeedComponent,
    AddNewSeedComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'my-gardens', component: MyGardensComponent},
      {path: 'my-plants', component: MyPlantsComponent},
      {path: 'my-seeds', component: MySeedsComponent},
      {path: 'my-plants/:id', component: UpdatePlantComponent},
      {path: 'add-new-plant', component: AddNewPlantComponent},
      {path: 'my-gardens/:id', component: UpdateGardenComponent},
      {path: 'add-new-garden', component: AddNewGardenComponent},
      {path: 'my-seeds/:id', component: UpdateSeedComponent},
      {path: 'add-new-seed', component: AddNewSeedComponent},
      {path: 'garden-details/:id', component: GardenDetailsComponent},
    ]),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
