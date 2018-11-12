function Music(sketch) {
  this.chimes = [];
  const offsets = [sketch.width/2*-.6, sketch.width/2*-.3, 0, sketch.width/2*.3, sketch.width/2*.6];
  const maxHeight = sketch.height * 0.8;
  const heights = [maxHeight, maxHeight*.8, maxHeight*.6, maxHeight*.4, maxHeight*.2];
  this.palette = new Palette([.5,.5,.5],[.5,.5,.5],[1,1,1],[0,0.3,0.6]);
  for (let i = 0; i < 5; i += 1) {
    const color = this.palette.getColor(i/5);
    const newChime = new Chime(sketch, color, sketch.width / 2 + offsets[i] - sketch.width*.05, maxHeight * .2, sketch.width*0.1, heights[i], (i+1) * 150);
    this.chimes.push(newChime);
  }
}

Music.prototype.collisionDetection = function(mousePos, chime) {
  const [mx, my] = mousePos;
  const cx = chime.x;
  const cy = chime.y;
  const cw = chime.w;
  const ch = chime.h;
  return (mx >= cx && mx <= cx + cw && my >= cy && my <= cy + ch);
}

Music.prototype.run = function(sketch) {
  const mousePos = [sketch.mouseX, sketch.mouseY];
  for (let chime of this.chimes) {
    const isColliding = this.collisionDetection(mousePos, chime);
    chime.run(isColliding, sketch);
  }
};

function Chime(sketch, color, x, y, w, h, freq,) {
  this.color = color;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.t = undefined;
  this.freq = freq;
  this.synth = sketch.FM({
    cmRatio	: 3.5307,
    index: 1,
    amp: 0.25,
    attack: 44,
    decay	: 44100,
    useADSR: true
  });
}

Chime.prototype.run = function(isColliding, sketch) {
  if (!this.colliding && isColliding) {
    this.play();
  }
  this.colliding = isColliding;
  sketch.noStroke();
  sketch.fill(this.color);
  sketch.rect(this.x, this.y, this.w, this.h);
}

Chime.prototype.play = function() {
  this.synth.note(this.freq);
};