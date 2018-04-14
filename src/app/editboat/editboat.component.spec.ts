import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditboatComponent } from './editboat.component';

describe('EditboatComponent', () => {
  let component: EditboatComponent;
  let fixture: ComponentFixture<EditboatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditboatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditboatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
