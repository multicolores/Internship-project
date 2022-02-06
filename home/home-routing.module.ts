import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './container/home.component';
import { TableDataComponent } from './component/table-data/table-data.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
    children: [{ path: 'data/:id', component: TableDataComponent }],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class HomeRoutingModule {}
