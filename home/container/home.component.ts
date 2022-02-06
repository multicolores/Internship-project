import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatomoTracker } from 'ngx-matomo';
import { Router } from '@angular/router';
import { NavArray } from '../component/constantData';
@Component({
  selector: 'rnd-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  readonly gitlabProjectUrl = 'https://gitlabee.dt.renault.com/shared/boilerplate/app-angular';
  readonly gitlabCloneUrl = 'https://gitlabee.dt.renault.com/shared/boilerplate/app-angular.git';

  constructor(private matomoTracker: MatomoTracker, private router: Router) {
    this.matomoTracker.setDocumentTitle('HomePage');
  }

  objectKeys = Object.keys;
  NavArray = NavArray;

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    for (let key of this.objectKeys(this.NavArray)) {
      this.options.push(key);
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  valueReset() {
    this.myControl.reset();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    for (let key of this.objectKeys(this.NavArray)) {
      if (key == this.myControl.value) {
        this.router.navigateByUrl('/home/data/' + this.myControl.value);
      }
    }
    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }
}
