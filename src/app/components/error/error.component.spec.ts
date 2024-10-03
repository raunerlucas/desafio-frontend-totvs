import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorComponent} from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct input value', () => {
    component.seached = "test value";
    fixture.detectChanges();
    expect(component.seached).toBe('test value');
  });
});
