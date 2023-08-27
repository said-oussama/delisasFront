import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelViewComponent } from './personnel-view.component';

describe('PersonnelViewComponent', () => {
  let component: PersonnelViewComponent;
  let fixture: ComponentFixture<PersonnelViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
