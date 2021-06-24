import {Component} from '@angular/core';
import {StarModel} from '../static/models/star.model';
import {StarList} from '../static/data/star.list';
import {CountryModel} from '../static/models/country.model';
import {CountryList} from '../static/data/country.list';
import {FieldList} from '../static/data/field.list';
import {FieldModel} from '../static/models/field.model';
import {GridHelper} from '../static/helpers/grid.helper';
import {flatten} from '@angular/compiler';
import {forkJoin, of} from 'rxjs';
import {catchError, mergeMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {PoiDatasheetModel} from '../static/models/api-response.model';
import {PoiRestService} from '../../services/poi.rest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  public readonly Arr = Array;

  public readonly fieldList: FieldModel[] = FieldList.VALUES;
  public readonly starList: StarModel[] = JSON.parse(JSON.stringify(StarList.VALUES));
  public readonly countryEuList: CountryModel[] = JSON.parse(JSON.stringify(CountryList.EU));
  public readonly countryOtherList: CountryModel[] = JSON.parse(JSON.stringify(CountryList.OTHER));
  public isLoading: boolean;
  public loaderInfo: {
    step: number
    nbSteps: number
  };
  public poiList: Map<string, PoiDatasheetModel>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private poiRestService: PoiRestService,
  ) {
    this.poiRestService.testApi()
      .pipe(tap((result: boolean) => !result && this.router.navigate([''])))
      .subscribe();
  }

  public selectAllCountries() {
    this.countryEuList.forEach(c => c.checked = true);
    this.countryOtherList.forEach(c => c.checked = true);
  }

  public unselectAllCountries() {
    this.countryEuList.forEach(c => c.checked = false);
    this.countryOtherList.forEach(c => c.checked = false);
  }

  public get canSubmit(): boolean {
    return this.selectedStars.length > 0
      && this.selectedCountries.length > 0
      && this.selectedFields.length > 0;
  }

  public get selectedCountries(): CountryModel[] {
    return this.countryEuList.concat(this.countryOtherList).filter(e => e.checked);
  }

  public get selectedFields(): FieldModel[] {
    return this.fieldList.filter(e => e.checked);
  }

  public get selectedStars(): StarModel[] {
    return this.starList.filter(e => e.checked);
  }

  public submit(): void {
    if (this.canSubmit) {
      this.poiList = null;
      const allPoi: Map<string, PoiDatasheetModel> = new Map<string, any>();
      const coords: string[] = flatten(this.selectedCountries.map((country: CountryModel) => GridHelper.getGrid(country)));

      const params = {
        stars: this.selectedStars.map(s => s.count),
        countryCodes: flatten(this.selectedCountries.map(c => c.code))
      };
      of({})
        .pipe(tap(() => this.loaderInfo = {step: 0, nbSteps: coords.length}))
        .pipe(tap(() => this.isLoading = true))
        .pipe(mergeMap(() => forkJoin(coords.map((coord: string) => this.poiRestService.callApi(allPoi, coord, params).pipe(tap(() => this.loaderInfo.step++))))))
        .pipe(tap(() => this.poiList = allPoi))
        .pipe(tap(() => this.isLoading = false))
        .pipe(catchError((err) => {
          this.isLoading = false;
          throw err;
        }))
        .subscribe();
    }
  }

  public reset() {
    this.poiList = null;
  }

  public selectAllFields() {
    this.fieldList.forEach(c => c.checked = true);
  }

  public unselectAllFields() {
    this.fieldList.forEach(c => c.checked = false);
  }
}
