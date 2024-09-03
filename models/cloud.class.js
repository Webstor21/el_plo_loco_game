class Cloud extends MovableObject {
	y = 0;
	height = 480;
	width = 1440;

	/**
	 *  Once a Cloud Object is created, its image path is stored in the src attribute of a newly created image object
	 *  using 'loadImage()' of the super constructor
	 */
	constructor() {
		super().loadImage("img/5_background/layers/4_clouds/full.png");
		this.x = 10 + Math.random() * 2000; 
		this.animate();
	}
	/**
	 * Cloud animation to the left
	 */
	animate() {
		this.cloudAnimateInterval = setInterval(() => {
				this.moveLeft();
		}, 1000/60);
	allIntervals.push(this.cloudAnimateInterval);
	}
}