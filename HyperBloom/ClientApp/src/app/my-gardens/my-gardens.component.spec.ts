import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGardensComponent } from './my-gardens.component';

describe('MyGardensComponent', () => {
  let component: MyGardensComponent;
  let fixture: ComponentFixture<MyGardensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGardensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyGardensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
