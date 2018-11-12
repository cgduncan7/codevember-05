/**
 * sketch
 */
var s = function(sketch) {
  // #region settings
  const framerate = 60;
  const w = window.innerWidth;
  const h = window.innerHeight;
  // #endregion

  var music;

  // #region p5
  sketch.setup = function() {
    const p5canvas = sketch.createCanvas(w, h);
    canvas = p5canvas.canvas;
    music = new Music(sketch);
    sketch.frameRate(framerate);
  }

  sketch.draw = function() {
    music.run(sketch);
  }
  // #endregion
};

var sketch = new p5(s, document.getElementById('sketch'));