import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AllArray } from '../interfaces';

@Component({
  selector: 'rnd-dialog-modification',
  templateUrl: './dialog-modification.component.html',
  styleUrls: ['./dialog-modification.component.scss'],
})
export class DialogModificationComponent implements OnInit {
  dataColumns: string[] = [];
  object?: { [key: string]: any } = this.data;
  optionsObjectId: any = {};
  optionsObjectProposition: any = {};
  PrefilledOptionsProposition: any = {};
  DataModel: any = {};

  constructor(public dialogRef: MatDialogRef<DialogModificationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    //create new object without reference
    this.DataModel = JSON.parse(JSON.stringify(this.data));
    this.dataColumns = Object.keys(this.DataModel.data);
    this.optionsObjectId = this.DataModel.optionsObjectId;
    this.optionsObjectProposition = this.DataModel.optionsObjectProposition;
    this.PrefilledOptionsProposition = this.DataModel.PrefilledOptionsProposition;
  }
  onAnnuler(): void {
    this.dialogRef.close();
  }

  onModifier(val: AllArray): void {
    this.dialogRef.close(val);
  }
}
