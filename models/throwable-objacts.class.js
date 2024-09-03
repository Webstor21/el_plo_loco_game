class ThrowableObjects extends MovableObject {
	BOTTLE_ROTATION = [
		'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
		'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
		'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
		'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
	];
	BOTTLE_SPLASH = [
		'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
		'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
		
	];
	offset = {
		top: 5,
		bottom: 5,
		left: 5,
		right: 5,
	};

	/**
	 * As soon as a Throwable-Object gets created, it's Image path is stored into the src attribute of a newly createt Image-Object
	 * via 'loadImage()' & 'loadImages()' of the Super-Constructor AND Throwable-Object is thrown immediatle* y
	 * @param {*} x - x-value from which the throw starts
	 * @param {*} y - y-value from which the throw starts
	 */
	constructor(x, y) {
		super().loadImage(this.BOTTLE_ROTATION[0]);
		this.loadImages(this.BOTTLE_ROTATION);
		this.loadImages(this.BOTTLE_SPLASH);
		this.x = x;
		this.y = y;
		this.height = 70;
		this.width = 70;
		this.throw();
	}

	/**
	 * Throws a bottle in one direction and then removes it from the collectedBottles array
	 */
	throw() {
		if (this.hasBottlesAndLooksRight()) {
			this.throwRightAnimation();
			world.collectedBottles.splice(0, 1);
		}
		if (this.hasBottlesAndLooksLeft()) {
			this.throwLeftAnimation();
			world.collectedBottles.splice(0, 1);
		}
	}

	/**
	 * Has a bottle in the array and looks to the right
	 * @returns true
	 */
	hasBottlesAndLooksRight() {
		return world.collectedBottles.length > 0 && !world.character.otherDirection;
	}

	/**
	 * Has a bottle in the array and looks to the left
	 * @returns true
	 */
	hasBottlesAndLooksLeft() {
		return world.collectedBottles.length > 0 && world.character.otherDirection;
	}

	/**
	 * Throw animation to the left
	 */
	throwLeftAnimation() {
		this.throwLeftAnimationInterval1 = setInterval(() => {
			this.playAnimation(this.BOTTLE_ROTATION);
		}, 150);
		allIntervals.push(this.throwLeftAnimationInterval1);
		this.speedY = -18;
		this.applyGravaityOtherDirection();
		this.throwLeftAnimationInterval2 = setInterval(() => {
			this.x -= 5;
		}, 1000 / 60);
		allIntervals.push(this.throwLeftAnimationInterval2);
	}

	/**
	 * Throw animation to the right
	 */
	throwRightAnimation() {
		this.throwRightAnimationInterval1 = setInterval(() => {
			this.playAnimation(this.BOTTLE_ROTATION);
		}, 150);
		allIntervals.push(this.throwRightAnimationInterval1);
		this.speedY = 18;
		this.applyGravaity();
		this.throwRightAnimationInterval2 = setInterval(() => {
			this.x += 5;
		}, 1000 / 60);
		allIntervals.push(this.throwRightAnimationInterval2);
	}

	/**
	 * Animation of a broken sleep
	 */
	splashAnimation() {
		this.splashAnimationIntervall = setInterval(() => {
			this.playAnimation(this.BOTTLE_SPLASH);
		}, 5);
		allIntervals.push(this.splashAnimationIntervall);
	}
}