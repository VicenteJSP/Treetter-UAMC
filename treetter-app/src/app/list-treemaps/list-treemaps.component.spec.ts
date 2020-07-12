import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTreemapsComponent } from './list-treemaps.component';

describe('ListTreemapsComponent', () => {
  let component: ListTreemapsComponent;
  let fixture: ComponentFixture<ListTreemapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTreemapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTreemapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
