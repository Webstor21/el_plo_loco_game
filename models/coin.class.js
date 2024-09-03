class Coin extends MovableObject {
	width = 100;
	height = 100;
	offset = {
		top: 35,
		bottom: 35,
		left: 35,
		right: 35,
	};
	COIN_IMAGE = ["img/8_coin/coin_1.png",
					"img/8_coin/coin_2.png"];

	/**
	 *  Once a Coin Object is created, its image path is stored in the src attribute of a newly created image object
	 *  using 'loadImage()' of the super constructor. Places them on different X positions
	 */
	constructor() {
		super().loadImage(this.COIN_IMAGE[0]);
		this.loadImages(this.COIN_IMAGE);
		this.y = 160 + Math.random() * 100;
		this.x = 500 + Math.random() * 3 * Math.random() * 600;
	}
}