import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubteamsPageComponent } from './subteams-page.component';

describe('SubteamsPageComponent', () => {
  let component: SubteamsPageComponent;
  let fixture: ComponentFixture<SubteamsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubteamsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubteamsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
