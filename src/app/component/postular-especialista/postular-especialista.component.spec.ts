import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostularEspecialistaComponent } from './postular-especialista.component';

describe('PostularEspecialistaComponent', () => {
  let component: PostularEspecialistaComponent;
  let fixture: ComponentFixture<PostularEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostularEspecialistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostularEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
