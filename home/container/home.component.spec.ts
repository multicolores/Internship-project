import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CustomMaterialModule } from '@shared/modules/custom-material.module';
import { HomeComponent } from './home.component';
import { MatomoTracker, MatomoModule } from 'ngx-matomo';
import { provideMockStore } from '@ngrx/store/testing';
import { getInitialAppState } from '@app/app-state';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let matomoTracker: MatomoTracker;
  // let store: MockStore<AppState>;
  // let state: AppState;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent],
        imports: [MatomoModule, CustomMaterialModule, TranslateModule.forRoot()],
        providers: [provideMockStore({ initialState: getInitialAppState() })],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)._paq = (window as any)._paq || [];
    matomoTracker = TestBed.inject(MatomoTracker);
    spyOn(matomoTracker, 'setDocumentTitle');

    // store = TestBed.inject(MockStore);
    // state = getInitialAppState();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('web analytics - Matomo', () => {
    it('should  set document title', () => {
      fixture.detectChanges();

      expect(matomoTracker.setDocumentTitle).toHaveBeenCalledWith('HomePage');
    });
  });
});
