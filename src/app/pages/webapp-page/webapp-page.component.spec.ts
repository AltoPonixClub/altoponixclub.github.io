import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebappPageComponent } from './webapp-page.component';

describe('WebappPageComponent', () => {
  let component: WebappPageComponent;
  let fixture: ComponentFixture<WebappPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebappPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebappPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
