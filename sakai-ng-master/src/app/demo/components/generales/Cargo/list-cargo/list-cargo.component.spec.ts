import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCargoComponent } from './list-cargo.component';

describe('ListCargoComponent', () => {
  let component: ListCargoComponent;
  let fixture: ComponentFixture<ListCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCargoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});