export default class Vec2 {
  private _x: number;
  private _y: number;

  constructor (x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public subtract(vec: Vec2) {
    return new Vec2(
      this._x - vec.x,
      this._y - vec.y 
    );
  }
  
  public add(vec: Vec2) {
    return new Vec2(
      vec.x + this._x,
      vec.y + this._y
    );
  }

  public absoluteDistance(vec: Vec2) {
    const distance = this.subtract(vec);
    const absoluteDistance = new Vec2(
      Math.abs(distance.x),
      Math.abs(distance.y)
    );

    return absoluteDistance;
  }

  public divideAll(factor: number) {
    return new Vec2(
      this._x / factor,
      this._y / factor
    );
  }

  public roundAll(decimals: number) {
    const decimalPow = Math.pow(10, decimals);

    return new Vec2(
      Math.round(this._x * decimalPow) / decimalPow,
      Math.round(this._y * decimalPow) / decimalPow
    );
  }

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }
}