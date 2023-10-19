import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewGardenComponent } from './add-new-garden.component';

describe('AddNewGardenComponent', () => {
  let component: AddNewGardenComponent;
  let fixture: ComponentFixture<AddNewGardenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewGardenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
