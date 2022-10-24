import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickLaneComponent } from './click-lane.component';

describe('ClickLaneComponent', () => {
  let component: ClickLaneComponent;
  let fixture: ComponentFixture<ClickLaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickLaneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClickLaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
