//this variable will hold our shader object
let simpleShader;

function preload() {
	simpleShader = loadShader('./assets/shader.vert', './assets/shader.frag');
}

function setup() {
	// shaders require WEBGL mode to work
	createCanvas(windowWidth, windowHeight, WEBGL);
	noStroke();
}

function draw() {
	// shader() sets the active shader with our shader
	shader(simpleShader);

	// rect gives us some geometry on the screen
	rect(0, 0, width, height);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
