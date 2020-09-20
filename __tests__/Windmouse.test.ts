import WindMouse from "../src/index";

test("Initialization Test", () => {
  expect(new WindMouse(5)).toBeDefined();
});

test("Point Generation Test", async () => {
  let windMouse = new WindMouse(5);

  let settings = {
    startX: Math.ceil(Math.random() * 1920),
    startY: Math.ceil(Math.random() * 1080),
    endX: Math.ceil(Math.random() * 1920),
    endY: Math.ceil(Math.random() * 1080),
    gravity: Math.ceil(Math.random() * 10),
    wind: Math.ceil(Math.random() * 10),
    minWait: 2,
    maxWait: Math.ceil(Math.random() * 5),
    maxStep: Math.ceil(Math.random() * 3),
    targetArea: Math.ceil(Math.random() * 10),
  };

  expect(await windMouse.GeneratePoints(settings)).toBeInstanceOf(Array);
});
