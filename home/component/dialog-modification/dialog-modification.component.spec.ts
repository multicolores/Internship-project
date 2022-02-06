import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModificationComponent } from './dialog-modification.component';

describe('DialogModificationComponent', () => {
  let component: DialogModificationComponent;
  let fixture: ComponentFixture<DialogModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
