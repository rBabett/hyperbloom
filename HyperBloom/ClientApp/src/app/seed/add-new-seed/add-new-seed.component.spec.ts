import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSeedComponent } from './add-new-seed.component';

describe('AddNewSeedComponent', () => {
  let component: AddNewSeedComponent;
  let fixture: ComponentFixture<AddNewSeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewSeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewSeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
