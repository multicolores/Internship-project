import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AllArray, AllData } from './component/interfaces';

import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from './component/dialog-error/dialog-error.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  private dataUrl = 'http://localhost:3000';

  getDatas(table: string): Observable<AllData> {
    const url = `${this.dataUrl}/${table}`;
    return this.http.get<AllData>(url).pipe(catchError(this.handleError<AllData>('getData')));
  }

  //**  POST data to server **
  addData(table: string | null, data: AllArray): Observable<AllArray> {
    const url = `${this.dataUrl}/${table}`;
    return this.http
      .post<AllArray>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError<AllArray>('addData')));
  }

  //**  DELET data from server **
  deleteData(table: string | null, id: string): Observable<AllArray> {
    const url = `${this.dataUrl}/${table}/${id}`;
    return this.http.delete<AllArray>(url, this.httpOptions).pipe(catchError(this.handleError<AllArray>('deleteData')));
  }

  //**  PATCH data from server **
  patchData(table: string | null, id: string, data: AllArray): Observable<{}> {
    const url = `${this.dataUrl}/${table}/${id}`;
    return this.http.patch(url, data, this.httpOptions).pipe(catchError(this.handleError<AllArray>('deleteData')));
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      const dialogRef = this.dialog.open(DialogErrorComponent, {
        data: { error },
      });
      dialogRef.afterClosed().subscribe();
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
