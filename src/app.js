import Gl from "./gl/gl.js";

class App {
  constructor() {
    this.init();
  }

  init() {
    this.gl = new Gl("c");
  }
}

new App();
