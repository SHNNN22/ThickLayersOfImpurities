let song;
//bg = document.body.style.backgroundImage = "url('assets/rend.png')";
function preload() {
	song = loadSound('/assets/DistilledIgnorance.wav');
}

var inc = 0.222;
var scl = 22;
var rows, cols;
var zoff = 222;


var fr;


var particles = [];
var flowfield;

var bg;

var amp;
var volhistory = [];

function setup() {
	createCanvas(666, 531);
	cols = floor(width / scl);
	rows = floor(height / scl);
	fr = createP('');

	flowfield = new Array(cols * rows);
amp = new p5.Amplitude();
}

function draw() {
	background(0,0);
	noFill();
	stroke(0);
	var vol = amp.getLevel();
	volhistory.push(vol);


	if(volhistory.length > 360) {
		volhistory.splice(0,1);
	}

var diam = floor(map(vol, 0, 1, 10, 200));

var yoff = 1;


for ( var y = 0; y < rows; y++ ) {
var xoff = 0;

for ( x = 0; x < cols; x++ ) {
	var index = x + y * cols;
	var angle = noise(xoff, yoff, zoff) * TWO_PI;
	var v = p5.Vector.fromAngle(angle);
	//v.setMag(vol); //22
				flowfield[index] = v;
	xoff += inc;
	stroke(0, 50);
	push();
	translate(x * scl, y * scl);
	rotate(v.heading());
	strokeWeight(1);
	pop();
}
yoff += inc;
zoff += 0.0002;

noiseDetail(28);
}
for(var i = 0; i < particles.length; i++) {
particles[i].follow(flowfield);
particles[i].update();
particles[i].show();
particles[i].edges();
}
fr.html(floor(frameRate()));
}
function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
		 noLoop();
  } else {
		loop();
    song.play();

		  for (var i = 0; i < 1111; i++) {
		  particles[i] = new Particle();
		  }
  }
}
