import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'rnd-dialog-suppression',
  templateUrl: './dialog-suppression.component.html',
  styleUrls: ['./dialog-suppression.component.scss'],
})
export class DialogSuppressionComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogSuppressionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  dataColumns: string[] = [];
  dataIdColumns: string[] = [];
  Elementdata: any = {};
  alreadyUseIddata: any = {};
  show: boolean = true;

  ngOnInit(): void {
    this.Elementdata = this.data.data;
    this.dataColumns = Object.keys(this.Elementdata);
  }
  getIdsData() {
    this.alreadyUseIddata = this.data.IdUtilisationObj;
    this.dataIdColumns = Object.keys(this.alreadyUseIddata);
    this.show = !this.show;
  }
  onAnnuler(): void {
    this.dialogRef.close();
  }

  onSupprimer(val: any): void {
    this.dialogRef.close(val);
  }

  isEmpty(obj: object) {
    if (obj) return Object.keys(obj).length === 0;
    else return true;
  }
}
