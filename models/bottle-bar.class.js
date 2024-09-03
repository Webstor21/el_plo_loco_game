class BottleBar extends DrawableObject {
	setBottlebarInterval;
	IMAGES_BOTTLEBAR = [
		'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
		'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
		'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
		'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
		'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
		'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
	];

	/**
	 *  Once a bottle-bar object is created, its image path is stored in the src attribute of a newly created image object
	 *  using 'loadImage()' of the super constructor
	 */
	constructor() {
		super().loadImage(this.IMAGES_BOTTLEBAR[0]);
		this.loadImages(this.IMAGES_BOTTLEBAR);
		this.x = 20;
		this.y = 100;
		this.width = 200;
		this.height = 60;
		this.setBottlebar();
	}

	/**
	 * The image is deposited, how long the array of collectedBottles is
	 */
	setBottlebar() {
		this.setBottlebarInterval = setInterval(() => {
			super.setBar(world.collectedBottles.length, this.IMAGES_BOTTLEBAR);
		}, 100);
		allIntervals.push(this.setBottlebarInterval);
	}

	/**
	 * Updates the bottle bar status based on the number of collected bottles.
	 * This function checks if the collectedBottles array exists in the world object and updates the image accordingly.
	 */
	updateBottleBarStatus() {
		if (world && world.collectedBottles) {
			super.setBar(world.collectedBottles.length, this.IMAGES_BOTTLEBAR);
		}
	}

	/**
	 * Clears the interval used to update the bottle bar.
	 * This function stops the interval set by setBottlebar().
	 */
	clearBottleBarInterval() {
		if (this.setBottlebarInterval) {
			clearInterval(this.setBottlebarInterval);
		}
	}
}