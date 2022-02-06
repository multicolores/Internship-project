import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'rnd-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogErrorComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogErrorComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  error: any = '';

  ngOnInit(): void {
    console.log(this.data);
    this.error = this.data.error;
    console.log(this.error.message);
    console.log(this.error.status);
  }
  onOk(): void {
    this.dialogRef.close();
  }
}
