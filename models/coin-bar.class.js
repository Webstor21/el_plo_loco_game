class CoinBar extends DrawableObject {
	IMAGES_COIN_BAR = [
		"img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
		"img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
		"img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
		"img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
		"img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
		"img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
	];

	/**
	 *  Once a Coin-Bar Object is created, its image path is stored in the src attribute of a newly created image object
	 *  using 'loadImage()' of the super constructor
	 */
	constructor() {
		super().loadImage(this.IMAGES_COIN_BAR[0]);
		this.x = 20;
		this.y = 50;
		this.width = 200;
		this.height = 60;
		this.setCoinbar();
	}

	/**
	 * The image is deposited, how long the array of collectedCoins is
	 */
	setCoinbar() {
		this.setCoinbarInterval = setInterval(() => {
			super.setBar(world.collectedCoins.length, this.IMAGES_COIN_BAR);
		}, 100);
		allIntervals.push(this.setCoinbarInterval);
	}
}