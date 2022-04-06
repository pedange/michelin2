import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {ApiResponseModel, PoiDatasheetModel} from '../components/static/models/api-response.model';

@Injectable({providedIn: 'root'})
export class PoiRestService {

  constructor(
    private http: HttpClient
  ) {
  }

  public callApi(
    result: Map<string, PoiDatasheetModel>,
    coord: string,
    params: {
      stars: number[],
      countryCodes: string[],
    },
    firstResult: number = 0
  ): Observable<ApiResponseModel> {
    const nbResults: number = 100;
    const url_request: string = this.buildUrl(coord, params.stars, nbResults, firstResult);
    return this.http.get<ApiResponseModel>(url_request)
      .pipe(tap((response: ApiResponseModel) =>
        response?.poiList
          .filter(poi => !result.get(poi.poi_id))
          .filter(poi => params.countryCodes.includes(poi.datasheets[0].country))
          .forEach(poi => result.set(poi.poi_id, poi.datasheets[0]))
      ))
      .pipe(
        mergeMap((response: ApiResponseModel) => {
          const nbPoiReceived: number = response?.poiList.length ?? 0;
          if (nbPoiReceived >= nbResults) {
            // on fait un autre appel
            return this.callApi(result, coord, params, firstResult + nbResults);
          } else {
            return of(null);
          }
        }));
  }

  private buildUrl(coord: string, stars: number[], nbResults: number, firstResult: number): string {
    const authKey: string = localStorage.getItem('michelinApiKey'); //?? 'RESTGP20210621092536412739709696';
    const api: string = `https://secure-apir.viamichelin.com/apir/2/findPoi.json2/RESTAURANT/eng`;
    const params: string = encodeURI([
      ['center', coord].join('='),
      ['nb', nbResults].join('='),
      ['dist', 200000 /*ne pas modifier (les calculs de coordonnées sont basées sur ce parametre*/].join('='),
      ['source', 'RESGR'].join('='),
      ['filter', `AGG.provider eq RESGR AND country eq FRA AND michelin_stars in [${stars.join(',')}]`].join('='),
      ['charset', 'UTF-8'].join('='),
      ['ie', 'UTF-8'].join('='),
      ['authKey', authKey].join('='),
      //   ['field', 'address,' + this.selectedFields.map((f: FieldModel) => f.code).join(',')].join('='),
      ['sidx', firstResult].join('='),
    ].join('&'));
    return `${api}?${params}`;
  }

  public testApi(): Observable<boolean> {
    const nbResults: number = 100;
    const url_request: string = this.buildUrl('-5.149666:42.42132', [3], nbResults, 0);
    return this.http.get<ApiResponseModel>(url_request)
      .pipe(map((response: ApiResponseModel) => !response.error))
      .pipe(catchError(() => of(false)));
  }
}
