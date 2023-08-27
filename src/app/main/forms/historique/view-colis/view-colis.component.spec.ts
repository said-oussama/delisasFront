import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewColisComponent } from './view-colis.component';

describe('ViewColisComponent', () => {
  let component: ViewColisComponent;
  let fixture: ComponentFixture<ViewColisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewColisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
