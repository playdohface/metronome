import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapTempoComponent } from './tap-tempo.component';

describe('TapTempoComponent', () => {
  let component: TapTempoComponent;
  let fixture: ComponentFixture<TapTempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TapTempoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TapTempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
