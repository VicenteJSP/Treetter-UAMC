import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3TreemapComponent } from './d3-treemap.component';

describe('D3TreemapComponent', () => {
  let component: D3TreemapComponent;
  let fixture: ComponentFixture<D3TreemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3TreemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3TreemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
