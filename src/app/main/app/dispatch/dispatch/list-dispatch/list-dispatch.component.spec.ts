import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDispatchComponent } from './list-dispatch.component';

describe('DispatchComponent', () => {
  let component: ListDispatchComponent;
  let fixture: ComponentFixture<ListDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDispatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
