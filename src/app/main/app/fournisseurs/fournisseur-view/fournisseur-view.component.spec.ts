import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurViewComponent } from './fournisseur-view.component';

describe('FournisseurViewComponent', () => {
  let component: FournisseurViewComponent;
  let fixture: ComponentFixture<FournisseurViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseurViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisseurViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
