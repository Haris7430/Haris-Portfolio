import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoShowcase } from './logo-showcase';

describe('LogoShowcase', () => {
  let component: LogoShowcase;
  let fixture: ComponentFixture<LogoShowcase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoShowcase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoShowcase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
