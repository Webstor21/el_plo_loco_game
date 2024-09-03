let level1;
/**
 * Creates a new level and stores everything in the variable level1
 */
function initLevel() {
	level1 = new Level(
		createEnemies(),
		createClouds(),
		createBackgrounds(),
		createCoins(),
		createBottles(),
	);
}

/**
 * Returns an object
 * @returns an Obcejt
 */
function createEnemies() {
	return [new Chicken(), new Chicken(), new Chicken(), new miniChicken(), new miniChicken(), new miniChicken(), new Endboss()];
}

/**
 * Returns an object
 * @returns an Obcejt
 */
function createBackgrounds() {
	return [
		new BackgroundObject("img/5_background/layers/air.png", -719),
		new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
		new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
		new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),
		new BackgroundObject("img/5_background/layers/air.png", 0),
		new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
		new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
		new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
		new BackgroundObject("img/5_background/layers/air.png", 719),
		new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
		new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
		new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),
		new BackgroundObject("img/5_background/layers/air.png", 1438),
		new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 1438),
		new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 1438),
		new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 1438),

		new BackgroundObject("img/5_background/layers/air.png", 2157),
		new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 2157),
		new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 2157),
		new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 2157),
	];
}

/**
 * Returns an object
 * @returns an Obcejt
 */
function createClouds() {
	return [new Cloud(), new Cloud()];
}

/**
 * Returns an object
 * @returns an Obcejt
 */
function createCoins() {
	return [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin()];
}

/**
 * Returns an object
 * @returns an Obcejt
 */
function createBottles() {
	return [
		new Bottle(),
		new Bottle(),
		new Bottle(),
		new Bottle(),
		new Bottle(),
		new Bottle(),
		new Bottle(),
		new Bottle(),
		new Bottle(),
		new Bottle(),
		new Bottle(),
		new Bottle(),
		new Bottle(),
		new Bottle(),
		new Bottle(),
		new Bottle(),
	];
}