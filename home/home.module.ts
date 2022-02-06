import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateFeatures } from '@app/app-state-features';
import { reducers } from '@modules/home/store';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './container/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DataService } from './data.service';
import { TableDataComponent } from './component/table-data/table-data.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [HomeComponent, TableDataComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule,
    StoreModule.forFeature(AppStateFeatures.Home, reducers),
    MatDialogModule,
  ],
  // the provider is here for the matdialog error present in services : https://stackoverflow.com/questions/47270324/nullinjectorerror-no-provider-for-matdialogref
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    DataService,
  ],
})
export class HomeModule {}
