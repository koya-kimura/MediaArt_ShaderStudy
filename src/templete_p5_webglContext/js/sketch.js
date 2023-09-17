let pointSprite;

function preload() {
	pointSprite = loadShader("./assets/shader.vert", "./assets/shader.frag")
}

function setup() {
	let _gl = createCanvas(windowWidth, windowHeight, WEBGL);
	gl = this._renderer.GL

	pointSprite.isPointShader = () => true;
	_gl.userPointShader = pointSprite;

	gl.disable(gl.DEPTH_TEST);
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
}

function draw() {
	background(0);

	shader(pointSprite);

	// pointSprite.setUniform("uSpriteColor", [1, 0, 0, 1]);
	// pointSprite.bindTexture();

	myPoints(5000);
}

function myPoints(num) {
	const gId = `myPoints|${num}`;
	if (!this._renderer.geometryInHash(gId)) {
		const myPointsGeom = new p5.Geometry();
		let v = createVector();
		for (let i = 0; i < num; i++) {
			// もはやただのノイズ
			// 1より大きい値にすればidにできるね・・0.01～0.99に落とすとかして。何でもできる。自由自在。
			let x = noise(i, 0, 0);
			let y = noise(0, i, 0);
			let z = noise(0, 0, i);
			myPointsGeom.vertices.push(v.set(x, y, z).copy());
		}
		buf = this._renderer.createBuffers(gId, myPointsGeom);
	}
	// 実は線分以上の情報がないとdrawBufferScaledなどの関数が使えない
	// ので、レンダラーに直接アクセスして内部関数を使って描画する。
	this._renderer._drawPoints(buf.model.vertices, this._renderer.immediateMode.buffers.point);
}
