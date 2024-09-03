class BackgroundObject extends MovableObject {
	width = 720;
	height = 480;

	/**
	 * As soon as a background object is created, its image path is stored in the src attribute of a newly created image object
	 * using 'loadImage()' of the super constructor
	 * @param {String} imagePath Path of Image of the Background-Object
	 * @param {Number} x Position of the image on the x axis
	 */
	constructor(imagePath, x) {
		super().loadImage(imagePath);
		this.x = x;
		this.y = 480 - this.height;
	}
}