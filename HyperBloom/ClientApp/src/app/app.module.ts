import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { MyPlantsComponent } from './plant/my-plants/my-plants.component';
import { AddNewPlantComponent } from "./plant/add-new-plant/add-new-plant.component";
import { UpdatePlantComponent } from "./plant/update-plant/update-plant.component";
import { MyGardensComponent } from "./garden/my-gardens/my-gardens.component";
import {UpdateGardenComponent} from "./garden/update-garden/update-garden.component";
import {AddNewGardenComponent} from "./garden/add-new-garden/add-new-garden.component";
import {GardenDetailsComponent} from "./garden/garden-details/garden-details.component";
import {MySeedsComponent} from "./seed/my-seeds/my-seeds.component";
import {UpdateSeedComponent} from "./seed/update-seed/update-seed.component";
import {AddNewSeedComponent} from "./seed/add-new-seed/add-new-seed.component";

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
