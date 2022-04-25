import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeScanComponent } from './home-scan.component';

describe('HomeScanComponent', () => {
  let component: HomeScanComponent;
  let fixture: ComponentFixture<HomeScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
