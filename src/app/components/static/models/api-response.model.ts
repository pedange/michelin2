export class ApiResponseModel {
  searchInfos: {
    QTime: number,
    lang: string,
    numFound: number,
    start: number,
    status: number
  };
  poiList: PoiModel[];
  error: {
    errorCode: number,
    errorMsg: string
  };

}

export interface PoiModel {
  poi_id: string;
  type: string;
  datasheets: PoiDatasheetModel[];
}

export interface PoiDatasheetModel {
  dts_id: string;
  name: string;
  phone: string;
  latitude: number;
  longitude: number;
  country: string;
  area: string;
  city: string;
  address: string;
  postcode: string;
  web: string;
  version: string;
  email: string;
  chef: string;
  michelin_stars: number;
}
