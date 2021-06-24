export class CountryModel {
  code: string[];
  name: string;
  coords: CountryCoordsModel[];
  checked?: boolean;

  constructor(code: string[], name: string, xMin: number, xMax: number, Xdist: number, yMin: number, yMax: number, yDist: number, checked?: boolean) {
    this.code = code;
    this.name = name;
    this.coords = [{
      xMin: xMin,
      xMax: xMax,
      xDist: Xdist,
      yMin: yMin,
      yMax: yMax,
      yDist: yDist,
    }];
    this.checked = checked;
  }

  public addCoords(
    xMin: number,
    xMax: number,
    Xdist: number,
    yMin: number,
    yMax: number,
    yDist: number,
  ): CountryModel {
    this.coords.push(
      {
        xMin: xMin,
        xMax: xMax,
        xDist: Xdist,
        yMin: yMin,
        yMax: yMax,
        yDist: yDist,
      }
    );
    return this;
  }

}

export class CountryCoordsModel {
  xMin: number;
  xMax: number;
  xDist: number;
  yMin: number;
  yMax: number;
  yDist: number;
}
