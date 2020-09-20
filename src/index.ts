import { MouseSettings, Point } from "./Types";

class WindMouse {
  private mouseSpeed: number;
  private randomSeed: number;
  private randomSpeed: number;

  constructor(mouseSpeed: number) {
    Object.assign(this, {
      mouseSpeed,
      randomSeed: Math.floor(Math.random() * 10),
      randomSpeed: Math.max(
        (this.randomSeed / 2.0 + mouseSpeed) / 10.0,
        0.1
      ),
    });
  }

  public async GeneratePoints(settings: MouseSettings): Promise<number[][]> {
    let dist: number;
    let windX: number = Math.floor(Math.random() * 10);
    let windY: number = Math.floor(Math.random() * 10);
    let velocityX: number = 0;
    let velocityY: number = 0;
    let randomDist: number;
    let veloMag: number;
    let step: number;

    let oldX: number;
    let oldY: number;
    let newX: number = Math.round(settings.startX);
    let newY: number = Math.round(settings.startY);

    let waitDiff: number = settings.maxWait - settings.minWait;
    let sqrt2: number = Math.sqrt(2.0);
    let sqrt3: number = Math.sqrt(3.0);
    let sqrt5: number = Math.sqrt(5.0);

    let points: number[][] = [];
    let currentWait: number = 0;

    dist = this.Hypot(
      settings.endX - settings.startX,
      settings.endY - settings.startY
    );

    while (dist > 1.0) {
      settings.wind = Math.min(settings.wind, dist);

      if (dist >= settings.targetArea) {
        let w: number = Math.floor(
          Math.random() * Math.round(settings.wind) * 2 + 1
        );

        windX = windX / sqrt3 + (w - settings.wind) / sqrt5;
        windY = windY / sqrt3 + (w - settings.wind) / sqrt5;
      } else {
        windX = windX / sqrt2;
        windY = windY / sqrt2;
        if (settings.maxStep < 3)
          settings.maxStep = Math.floor(Math.random() * 3) + 3.0;
        else settings.maxStep = settings.maxStep / sqrt5;
      }

      velocityX += windX;
      velocityY += windY;
      velocityX =
        velocityX +
        (settings.gravity * (settings.endX - settings.startX)) / dist;
      velocityY =
        velocityY +
        (settings.gravity * (settings.endY - settings.startY)) / dist;

      if (this.Hypot(velocityX, velocityY) > settings.maxStep) {
        randomDist =
          settings.maxStep / 2.0 +
          Math.floor((Math.random() * Math.round(settings.maxStep)) / 2);
        veloMag = this.Hypot(velocityX, velocityY);
        velocityX = (velocityX / veloMag) * randomDist;
        velocityY = (velocityY / veloMag) * randomDist;
      }

      oldX = Math.round(settings.startX);
      oldY = Math.round(settings.startY);
      settings.startX += velocityX;
      settings.startY += velocityY;
      dist = this.Hypot(
        settings.endX - settings.startX,
        settings.endY - settings.startY
      );
      newX = Math.round(settings.startX);
      newY = Math.round(settings.startY);

      step = this.Hypot(settings.startX - oldX, settings.startY - oldY);
      let wait = Math.round(
        waitDiff * (step / settings.maxStep) + settings.minWait
      );
      currentWait += wait;

      if (oldX != newX || oldY != newY) {
        points.push([newX, newY, currentWait]);
      }
    }

    let endX: number = Math.round(settings.endX);
    let endY: number = Math.round(settings.endY);

    if (endX != newX || endY != newY) {
      points.push([newX, newY, currentWait]);
    }

    return Promise.resolve(points);
  }

  Hypot(dx: number, dy: number) {
    return Math.sqrt(dx * dx + dy * dy);
  }

  Sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// CommonJS support for default export
module.exports = WindMouse;
module.exports.default = WindMouse;
module.exports.__esModule = true;
