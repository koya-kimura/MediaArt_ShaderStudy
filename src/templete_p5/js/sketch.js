let simpleShader;

let params = {
	r:1,
	g:0,
	b:0,
	a:1,
};

function preload() {
    simpleShader = loadShader('./assets/shader.vert', './assets/shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();

	const gui = new dat.GUI();
	gui.add(params, 'r', 0, 1, 0.01);
	gui.add(params, 'g', 0, 1, 0.01);
	gui.add(params, 'b', 0, 1, 0.01);
	gui.add(params, 'a', 0, 1, 0.01);
}

function draw() {
    shader(simpleShader);
	simpleShader.setUniform('uColor', [params.r, params.g, params.b, params.a]);

    rect(0, 0, width, height);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
