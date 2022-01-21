import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuLibrosComponent } from './cu-libros.component';

describe('CuLibrosComponent', () => {
  let component: CuLibrosComponent;
  let fixture: ComponentFixture<CuLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuLibrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
