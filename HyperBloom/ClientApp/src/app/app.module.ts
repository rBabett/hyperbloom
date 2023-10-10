import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { MyPlantsComponent } from './my-plants/my-plants.component';
import { AddNewPlantComponent } from "./add-new-plant/add-new-plant.component";
import { UpdatePlantComponent } from "./update-plant/update-plant.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    MyPlantsComponent,
    AddNewPlantComponent,
    UpdatePlantComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'counter', component: CounterComponent},
      {path: 'my-plants', component: MyPlantsComponent},
      {path: 'my-plants/:id', component: UpdatePlantComponent},
      {path: 'add-new-plant', component: AddNewPlantComponent},
    ]),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
