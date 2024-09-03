class DrawableObject {
	img;
	imageCashe = {};
	currentImage = 0;
	x = 120;
	y = 230;
	height = 200;
	width = 100;

	/**
	 * Creates a new Img object and gives in the image path
	 * @param {string} path - Path of Image for the Image-Object that is created
	 */
	loadImage(path) {
		this.img = new Image();
		this.img.src = path;
	}

	/**
	 * Draws an Image at (x,y) with a certain width and a certain height
	 * @param {string} ctx - Context of our Canvas 2D or 3D
	 */
	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}	

	/**
	 * Creates many new Image-Objects, gives them an Image-Path and stores them in 'this.imageCache'
	 * @param {string} array - Paths of Images for the Image-Objects that are created ['img/1.png', 'img/2.png', ...]
	 */
	loadImages(array) {
		array.forEach((path) => {
			let img = new Image();
			img.src = path;
			img.style = 'transform: scaleX(-1)';
			this.imageCashe[path] = img;
		});
	}

	setBar(array, imageBar) {
		const index = Math.min(Math.floor(array / 2), imageBar.length - 1);
		this.loadImage(imageBar[index]);
	}
}