import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirPageComponent } from './redir-page.component';

describe('RedirPageComponent', () => {
  let component: RedirPageComponent;
  let fixture: ComponentFixture<RedirPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
