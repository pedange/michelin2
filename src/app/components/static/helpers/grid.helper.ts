import {CountryCoordsModel, CountryModel} from '../models/country.model';
import {GridCoordsModel} from '../models/grid-coords.model';

export class GridHelper {

  public static getGrid(country: CountryModel): string[] {
    const gridCoords: GridCoordsModel[] = this.getGridCoords(country);
    const listCoords: string[] = [];
    gridCoords.forEach((gridCoord: GridCoordsModel) => {
      for (let y = 0; y < gridCoord.nbY; y++) {
        const isYEven = y % 2 == 0;
        //cas Y pair ou zero: on ne prend que les X pairs
        //Cas Y Impaire : on ne prend que les X impairs
        for (let x = isYEven ? 0 : 1; x <= gridCoord.nbX; x = x + 2) {
          listCoords.push(gridCoord.x[x] + ':' + gridCoord.y[y]);
        }
      }
    });
    return listCoords;
  }

  private static getGridCoords(country: CountryModel): GridCoordsModel[] {
    return country.coords.map((coords: CountryCoordsModel) => {
      return new GridCoordsModel(
        this.getNb(coords.xDist),
        this.calculCoords(coords.xMin, coords.xMax, this.getNb(coords.xDist)),
        this.getNb(coords.yDist),
        this.calculCoords(coords.yMin, coords.yMax, this.getNb(coords.yDist)),
      );
    });
  }

  private static getNb(dist: number): number {
    const gridStepSize = 180; //(km)
    return Math.ceil(dist / gridStepSize);
  }

  private static calculCoords(min: number, max: number, nb: number): number[] {
    const retour: number[] = [];
    const step: number = Math.abs(max - min) / nb;
    for (let i = 0; i <= nb; i++) {
      retour[i] = min + i * step;
    }
    return retour;
  }

}
