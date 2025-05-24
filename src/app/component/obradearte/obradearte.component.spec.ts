import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObradearteComponent } from './obradearte.component';

describe('ObradearteComponent', () => {
  let component: ObradearteComponent;
  let fixture: ComponentFixture<ObradearteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObradearteComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObradearteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
