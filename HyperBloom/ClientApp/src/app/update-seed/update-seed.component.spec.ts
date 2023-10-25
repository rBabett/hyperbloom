import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSeedComponent } from './update-seed.component';

describe('UpdateSeedComponent', () => {
  let component: UpdateSeedComponent;
  let fixture: ComponentFixture<UpdateSeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
