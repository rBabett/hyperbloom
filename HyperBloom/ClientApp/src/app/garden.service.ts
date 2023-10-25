import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Needs, Plant} from "./my-plants/my-plants.component";
import {getBaseUrl} from "../main";
import {Cell, Garden} from "./my-gardens/my-gardens.component";

@Injectable({
  providedIn: 'root'
})
export class GardenService {

  private Http: HttpClient;

  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private router: Router) {
    this.Http = http;
  }

  getGardens(): Observable<Garden[]> {
    return this.Http.get<Garden[]>(getBaseUrl() + 'api/gardens');
  }

  getCells(): Observable<Cell[]>{
    return this.Http.get<Cell[]>(getBaseUrl() + 'api/cells');
  }
  getGardenById(id: number): Observable<Garden> {
    return this.Http.get<Garden>(getBaseUrl() + 'api/gardens/' + id);
  }

  deleteGarden(id: number) {
    this.Http.delete(getBaseUrl() + 'api/gardens/' + id).subscribe(
      (data) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['my-gardens']);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      });
  }

  addNewGarden(formData: FormData) {
    this.Http.post<Plant>(getBaseUrl() + 'api/gardens/add-new-garden', formData).subscribe(
      (data) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['my-gardens']);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      });
  }
  updateGarden(id: number, formData: {
    Name: string | null | undefined;
    Columns: number | null | undefined;
    Rows: number | null | undefined;
  }) {
    this.Http.put<Garden>(getBaseUrl() + 'api/gardens/' + id, formData).subscribe(
      () => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['my-gardens']);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      });
  }

  updateGardenCells(id: number, cells: any) {
    this.Http.put<Cell[]>(getBaseUrl() + 'api/gardens/' + id + '/cells', cells).subscribe(
      () => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['my-gardens']);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      });
  }

  waterCell(cellId: number, gardenId: number) {
    this.Http.put(getBaseUrl() + 'api/gardens/' + cellId + '/water', {}).subscribe(
      () => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['garden-details/' + gardenId]);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      });
  }

  fertilizeCell(cellId: number, gardenId: number) {
    this.Http.put(getBaseUrl() + 'api/gardens/' + cellId + '/fertilize', {}).subscribe(
      () => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['garden-details/' + gardenId]);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      });
  }

  createRange(number: number | undefined){
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  getCellOnPosition(garden: Garden, column: number, row: number) : Cell {
    return <Cell>garden.cells.find(c => c.columnPosition === column && c.rowPosition === row);
  }
}
