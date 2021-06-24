import {CountryModel} from '../models/country.model';

export class CountryList {
  public static EU: CountryModel[] = [
    new CountryModel(['FRA', 'MCO'], 'France', -5.1496, 8.244782, 1052, 42.42132, 51.089528, 964, true),
    new CountryModel(['BEL'], 'Belgique', 2.55, 6.4, 273, 49.5, 51.5, 223),
    new CountryModel(['GBR'], 'Angleterre', -7.515, 1.775, 592, 49.883, 59.4, 1058),
    new CountryModel(['IRL'], 'Irlande', -10.4953, -5.438, 347, 51.413, 55.391, 443),
    new CountryModel(['NLD'], 'Pays-Bas', 3.361, 7.213, 263, 50.75, 53.692, 327),
    new CountryModel(['ESP'], 'Espagne', -9.29, 4.31, 1170, 36.02, 43.79, 864),
    new CountryModel(['ESP'], 'Iles Canaries', -18.17, -13.41, 183, 27.64, 29.29, 468),
    new CountryModel(['ITA'], 'Italie', 6.63, 18.51, 981, 35.49, 47.09, 1290),
    new CountryModel(['GRC'], 'Grèce', 19.62, 28.26, 736, 34.91, 41.75, 760),
    new CountryModel(['PRT'], 'Portugal', -9.5, -6.19, 282, 36.96, 42.16, 864),
    new CountryModel(['PRT'], 'Madère', -17.27, -16.67, 57, 32.63, 32.87, 27),
    new CountryModel(['CHE'], 'Suisse', 5.95, 10.5, 352, 45.82, 47.81, 221),
    new CountryModel(['LUX'], 'Luxembourg', 5.73, 6.53, 60, 49.26, 50.18, 80),
    new CountryModel(['DEU'], 'Allemagne', 5.86, 15.04, 640, 47.27, 54.91, 850),
    new CountryModel(['AUT'], 'Autriche', 9.56, 17.16, 570, 46.38, 49.02, 295),
    new CountryModel(['HRV'], 'Croatie', 13.49, 19.44, 465, 42.39, 46.55, 465),
    new CountryModel(['EST'], 'Estonie', 21.77, 28.21, 375, 57.52, 59.67, 240),
    new CountryModel(['FIN'], 'Finlande', 19.46, 31.59, 620, 59.8, 70.1, 1141),
    new CountryModel(['CZE'], 'R.Tchèque', 12.09, 18.86, 486, 48.55, 51.05, 279),
    new CountryModel(['HUN'], 'Hongrie', 16.11, 22.90, 513, 45.74, 48.59, 279),
    new CountryModel(['SVN'], 'Slovenie', 13.38, 16.61, 250, 45.42, 46.87, 162),
    new CountryModel(['DNK'], 'Danemark', 7.86, 15.23, 455, 54.43, 58.03, 400),
    new CountryModel(['DNK'], 'Danemark', -7.66, -6.24, 77, 61.38, 62.39, 112),
    new CountryModel(['POL'], 'Pologne', 14.12, 24.15, 687, 49.00, 54.91, 656),
    new CountryModel(['SWE'], 'Suède', 10.58, 24.18, 752, 55.01, 69.06, 1563),
    new CountryModel(['NOR'], 'Norvège', 4.57, 31.4, 1200, 57.58, 71.05, 1500),
  ].sort((a: CountryModel, b: CountryModel) => a.name.localeCompare(b.name));

  public static OTHER: CountryModel[] = [
    new CountryModel(['BRA'], 'Brésil (Sao Paulo & Rio)', -48.9, -40.5, 880, -25.8, -20.67, 570),
    new CountryModel(['USA'], 'USA', -124.1, -67.26, 4780, 25.9, 49, 2560),
    new CountryModel(['SGP'], 'Singapour', 103.6, 104.09, 54, 1.21, 1.48, 30),
    new CountryModel(['THA'], 'Thailande', 98.16, 105.58, 790, 5.92, 20.45, 1620),
    new CountryModel(['TWN'], 'Taiwan', 120.14, 122.01, 180, 21.92, 25.33, 382),
    new CountryModel(['KOR'], 'Corée du Sud', 126.14, 129.5, 305, 33.2, 38.6, 600),
    new CountryModel(['ZAF'], 'Afrique du sud', 16.51, 32.89, 1633, -34.26, -22.12, 1373),
    // Chine - Shangai
    new CountryModel(['CHN', 'HKG', 'MAC'], 'Chine (Shangai, Guangzhou, HK)', 120.8, 122, 110, 30.69, 31.9, 130)
      // Chine - Guangzhou
      .addCoords(112.96, 114, 105, 22.58, 23.95, 150)
      // HKG + MACAO
      .addCoords(113.5, 122, 114.43, 22.03, 22.59, 65),
  ].sort((a: CountryModel, b: CountryModel) => a.name.localeCompare(b.name));
}
