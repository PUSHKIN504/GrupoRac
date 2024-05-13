import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModeloComponent } from './list-modelo.component';

describe('ListModeloComponent', () => {
  let component: ListModeloComponent;
  let fixture: ComponentFixture<ListModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListModeloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
