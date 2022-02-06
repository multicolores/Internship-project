import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuppressionComponent } from './dialog-suppression.component';

describe('DialogSuppressionComponent', () => {
  let component: DialogSuppressionComponent;
  let fixture: ComponentFixture<DialogSuppressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSuppressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSuppressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
