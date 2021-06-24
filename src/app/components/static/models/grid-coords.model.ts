export class GridCoordsModel {
  nbX: number;
  x: number[];
  nbY: number;
  y: number[];

  get size(): number {
    return this.x?.length ?? 0;
  }

  constructor(nbX: number, x: number[], nbY: number, y: number[]) {
    this.nbX = nbX;
    this.x = x;
    this.nbY = nbY;
    this.y = y;
  }
}
