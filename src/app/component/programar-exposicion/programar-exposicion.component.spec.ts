import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramarExposicionComponent } from './programar-exposicion.component';

describe('ProgramarExposicionComponent', () => {
  let component: ProgramarExposicionComponent;
  let fixture: ComponentFixture<ProgramarExposicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramarExposicionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramarExposicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
