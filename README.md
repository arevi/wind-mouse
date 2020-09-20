## WindMouse
WindMouse is a lightweight, and highly configurable, library for generating human-like mouse movement. The data points are then returned in a x,y point array for further usage.
 
### Installation
```
npm install windmouse
```

### Usage
```
const WindMouse = require("windmouse");
const fs = require("fs");

// Initialize WindMouse class
const windMouse = new WindMouse(Math.floor(Math.random() * 10));

// MouseSettings
let settings = {
  startX: Math.floor(Math.random() * 1920),
  startY: Math.floor(Math.random() * 1080),
  endX: Math.floor(Math.random() * 1920),
  endY: Math.floor(Math.random() * 1080),
  gravity: Math.floor(Math.random() * 10),
  wind: Math.floor(Math.random() * 10),
  minWait: 2,
  maxWait: Math.floor(Math.random() * 5),
  maxStep: Math.floor(Math.random() * 3),
  targetArea: Math.floor(Math.random() * 10),
};

// Print points
async function logPoints() {
  let points = await windMouse.GeneratePoints(settings);
  console.log(points);
}

logPoints();
```

### Contributng
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License
https://opensource.org/licenses/MIT

### Credits
The originally WindMouse library was created by https://github.com/BenLand100 for Java. This is a port of said library enabling for usage with JavaScript/TypeScript.
