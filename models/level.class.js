class Level {
	enemies;
	clouds;
	backgroundObjects;
	coins;
	bottles;
	level_end_x = 2250;

	/**
	 * At Creation of a new level, all movable objects that should be created have to be transfered as Arrays
	 * @param {Array Object} enemies - enemies Chicken, ChickenSmall, Endboss
	 * @param {Array Object} clouds - Clouds
	 * @param {Array Object} backgroundObjects - Background-Objects
	 * @param {Array Object} coins - Coins
	 * @param {Array Object} bottles - Bottles
	 */
	constructor(enemies, clouds, backgroundObjects, coins, bottles) {
		this.enemies = enemies;
		this.clouds = clouds;
		this.backgroundObjects = backgroundObjects;
		this.coins = coins;
		this.bottles = bottles;
	}
}