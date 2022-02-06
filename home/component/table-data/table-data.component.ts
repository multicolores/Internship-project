import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { DataService } from '../../data.service';
import { AllArray, AllData } from '../interfaces';

import { DialogModificationComponent } from '../dialog-modification/dialog-modification.component';
import { DialogSuppressionComponent } from '../dialog-suppression/dialog-suppression.component';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { IdsUrl, IdsUrlToKnowIfUse, NavArray, PrefilledOptionsArray } from '../constantData';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'rnd-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush  //* On enlève cette ligne car elle empêche le rafraichissement de la page quand il y a une nouvelle valeur
})
export class TableDataComponent implements OnInit {
  navigationSubscription: any;
  datas: AllData | null = null;
  arraydatas: AllArray[] = [];
  dataSource: any = null;
  columnsElements: string[] = [];
  displayedColumnsToConcat: string[] = ['button'];
  displayedColumns: string[] = [];
  dataColumns: string[] = [];
  valueToAdd: any = <AllArray>{};
  show: boolean = true;
  showModifierBt: boolean = true;
  idAlreadyUse: boolean = false;
  croissant: boolean = true;
  table: string | null = null;
  datasid: AllData | null = null;
  arraydatasid: AllArray[] = [];
  urlTogetId: string[] = [];
  optionsObjectId: any = {};
  optionsObjectProposition: any = {};
  PrefilledOptionsProposition: any = {};

  constructor(
    private dataservice: DataService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    // Le code qui suit est ici car au changement d'url le component ne relance pas le ngOnInit
    // https://stackoverflow.com/questions/40983055/how-to-reload-the-current-route-with-the-angular-2-router
    // subscribe to the router events. Store the subscription so we can unsubscribe later.
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  @ViewChild(MatSort) sort!: MatSort;

  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.croissant = true;
    this.show = true;
    this.idAlreadyUse = false;
    this.PrefilledOptionsProposition = {};
    this.optionsObjectId = {
      methodId: [],
      checkId: [],
      moduleInstanceId: [],
      moduleId: [],
      systemTypeId: [],
      systemCategoryId: [],
      systemId: [],
      infraId: [],
      environmentId: [],
      platformId: [],
      setupId: [],
      contributorId: [],
      serviceId: [],
      brandId: [],
      regionId: [],
    };
    this.getDatas();
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  // ** Fetch datas
  getDatas(): void {
    // get what table we need to fetch ( look in the url )
    this.table = this.route.snapshot.paramMap.get('id');
    this.optionsObjectProposition = {
      // name: [],
      actionType: [],
      type: [],
      categoryName: [],
      apiAddress: [],
      seq: [],
      description: [],
      enableStatus: [],
      baseUrl: [],
      version: [],
      contributorType: [],
      diagnosticType: [],
    };
    if (this.table) {
      this.dataservice.getDatas(this.table).subscribe((datas) => {
        this.datas = datas;
        this.arraydatas = this.datas.data;
        this.columnsElements = Object.keys(this.arraydatas[0]);

        // Displays data in ascending order of ids
        if (typeof this.arraydatas[0].id == 'string') {
          this.arraydatas.sort(function (a: any, b: any) {
            return a.id.replace(/\D/g, '') - b.id.replace(/\D/g, '');
          });
        } else {
          this.arraydatas.sort(function (a: any, b: any) {
            return a.id - b.id;
          });
        }

        // ** Table angular material **
        this.getTableColumnsinfo(this.columnsElements);
        this.dataSource = new MatTableDataSource(this.arraydatas);

        // * Allows to not filter createdAt and updatedAt column ( Search bar "Filter data")
        this.dataSource.filterPredicate = function (data: AllArray, filter: string): boolean {
          let dataToFilter = Object.assign({}, data);
          delete dataToFilter.createdAt;
          delete dataToFilter.updatedAt;
          const dataStr = Object.keys(dataToFilter)
            .reduce((currentTerm: string, key: string) => {
              return currentTerm + (data as { [key: string]: any })[key] + '';
            }, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();

          const transformedFilter = filter
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();

          return dataStr.indexOf(transformedFilter) != -1;
        };

        this.dataSource.sort = this.sort; // Material sorting
        // ** Data proposition
        this.getDataProposition();
      });

      // ** Select id from other table / Prefilled Data proposition in select
      this.preFilledDataProposition(this.table);
      if (IdsUrl[this.table]) this.getIdDatas(IdsUrl[this.table][0], IdsUrl[this.table][1]);
      if (this.table == 'methods') {
        const ObjEnableStatus = { enableStatus: ['true', 'false'] };
        Object.assign(this.PrefilledOptionsProposition, ObjEnableStatus);
        delete this.optionsObjectProposition.enableStatus;
      }

      // ** Don't show "Change" button for tables who don't have "patch" possible in the database
      if (
        this.table == 'method-checks' ||
        this.table == 'environment-module-instances' ||
        this.table == 'contributors-module-instances'
      )
        this.showModifierBt = false;
      else this.showModifierBt = true;
    }
  }

  getTableColumnsinfo(data: string[]): void {
    this.displayedColumns = data.concat(this.displayedColumnsToConcat);
    this.dataColumns = data;
  }
  // ** Add **
  add() {
    if (this.valueToAdd.id) {
      this.dataservice.addData(this.table, this.valueToAdd).subscribe(() => {
        // we display again datas with the one that has just been sent
        this.getDatas();
        this.valueToAdd = <AllArray>{};
        // this.show = !this.show;
      });
    } else {
      const dialogRef = this.dialog.open(DialogErrorComponent, {
        data: { error: { message: 'id vide' } },
      });
      dialogRef.afterClosed().subscribe();
    }
  }

  // ** Delet avec confirmation**
  delete(data: AllArray) {
    let IdUtilisationObj = null;
    if (this.table)
      if (IdsUrlToKnowIfUse[this.table]) {
        IdUtilisationObj = this.getIdUtilisation(IdsUrlToKnowIfUse[this.table], data.id);
      }
    const dialogRef = this.dialog.open(DialogSuppressionComponent, {
      data: { data: data, IdUtilisationObj: IdUtilisationObj },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataservice.deleteData(this.table, data.id).subscribe((data) => {
          this.getDatas();
        });
      }
    });
  }

  // ** Modification / Change **
  patch(data: AllArray) {
    const dialogRef = this.dialog.open(DialogModificationComponent, {
      // data: data,
      data: {
        data: data,
        optionsObjectId: this.optionsObjectId,
        optionsObjectProposition: this.optionsObjectProposition,
        PrefilledOptionsProposition: this.PrefilledOptionsProposition,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let id = result.data.id;
        delete result.data.id;
        this.dataservice.patchData(this.table, id, result.data).subscribe((data) => {
          this.getDatas();
        });
      }
    });
  }

  // ** Filter angular material **
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ** Select ids from other table
  getIdDatas(urlTogetId: string[], nameInputid: string[]) {
    this.urlTogetId = urlTogetId;
    for (let e = 0; e < urlTogetId.length; e++) {
      this.dataservice.getDatas(urlTogetId[e]).subscribe((datas) => {
        this.datasid = datas;
        this.arraydatasid = this.datasid.data;
        for (let i = 0; i < Number(this.datasid.total); i++) {
          if (!this.optionsObjectId[nameInputid[e]].includes(String(this.arraydatasid[i].id))) {
            this.optionsObjectId[nameInputid[e]].push(String(this.arraydatasid[i].id));
          }
        }
        this.optionsObjectId[nameInputid[e]].sort(function (a: any, b: any) {
          return a.replace(/\D/g, '') - b.replace(/\D/g, ''); // organize ascending
        });
      });
    }
  }

  // ** Data Proposition in select
  // take datas which are in table and suggest this datas in the select
  getDataProposition() {
    if (this.datas)
      for (let e = 0; e < Number(this.datas.total); e++) {
        for (const [key, value] of Object.entries(this.arraydatas[e])) {
          if (this.optionsObjectProposition.hasOwnProperty(key))
            if (!this.optionsObjectProposition[key].includes(String(value)))
              // don't put the same data twice
              this.optionsObjectProposition[key].push(String(value));
        }
      }
  }
  // put datas that are in PrefilledOptionsArray (in constant.ts)
  preFilledDataProposition(table: string) {
    if (PrefilledOptionsArray[table]) {
      let keys: any = Object.keys(PrefilledOptionsArray[table]);
      keys.forEach((key: any) => {
        if (this.optionsObjectProposition[key])
          this.optionsObjectProposition[key] = this.optionsObjectProposition[key].concat(
            PrefilledOptionsArray[table][key]
          );
      });
    }
  }

  // ** check if the entered id is already use
  idNgModelChange() {
    if (this.datas)
      for (let e = 0; e < Number(this.datas.total); e++) {
        if (this.valueToAdd.id == this.arraydatas[e].id) {
          this.idAlreadyUse = true;
          break;
        } else {
          this.idAlreadyUse = false;
        }
      }
  }

  ScrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  ngOnInit(): void {
    // this.getDatas();
  }

  // ** Show where id is used
  objectKeys = Object.keys;
  getIdUtilisation(nameInputid: string, refId: string): object {
    let everyTable: string[] = [];
    for (let key of this.objectKeys(NavArray)) {
      everyTable.push(key);
    }
    let IdUtilisationObj: any = {};
    for (let i = 0; i < everyTable.length; i++) {
      this.dataservice.getDatas(everyTable[i]).subscribe((datas: any) => {
        let counter: number = 0;
        for (let e = 0; e < Number(datas.total); e++) {
          if (datas.data[e][nameInputid] == refId) {
            counter++;
            const ObjEnableStatus = { [everyTable[i]]: counter };
            Object.assign(IdUtilisationObj, ObjEnableStatus);
          }
        }
      });
    }
    return IdUtilisationObj;
  }

  // ** Material sorting : Announce the change in sort state for assistive technology.
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
