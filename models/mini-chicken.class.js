class miniChicken extends MovableObject {
	y = 365;
	width = 50;
	height = 50;
	offset = {
		top: 5,
		bottom: 5,
		left: 20,
		right: 20,
	};
	energy = 2;
	CHICKEN_SMALL_WALKING = [
		"img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
		"img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
		"img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
	];

	CHICKEN_SMALL_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

	/**
	 *  Once a mini Chicken Object is created, its image path is stored in the src attribute of a newly created image object
	 *  using 'loadImage()' of the super constructor. Places them on fix X positions
	 */
	constructor() {
		super().loadImage(this.CHICKEN_SMALL_WALKING[0]);
		this.loadImages(this.CHICKEN_SMALL_WALKING);
		this.loadImages(this.CHICKEN_SMALL_DEAD);
		this.x = 300 + Math.random() * 1000; 
		this.speed = 0.7 + Math.random() * 0.5;
		this.animate();
		this.minichickenMovement();
	}

	/**
	 * The interval checks whether the chicken is still alive and running to the left
	 */
	minichickenMovement() {
		this.minichickenMovementInterval = setInterval(() => {
			if (!this.isDead()) {
				this.moveLeft();
			}
		}, 1000 / 60);
		allIntervals.push(this.minichickenMovementInterval);
  }
  
	/**
	 * The interval checks whether the chicken is still alive and plays the appropriate animation
	 */
	animate() {
		this.minichickenAnimate = setInterval(() => {
			if (this.isDead()) {
				this.playAnimation(this.CHICKEN_SMALL_DEAD);
			} else {
				this.playAnimation(this.CHICKEN_SMALL_WALKING);
			}
		}, 100);
		allIntervals.push(this.minichickenAnimate);
	}
}