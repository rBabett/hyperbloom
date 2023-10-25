import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySeedsComponent } from './my-seeds.component';

describe('MySeedsComponent', () => {
  let component: MySeedsComponent;
  let fixture: ComponentFixture<MySeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySeedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
