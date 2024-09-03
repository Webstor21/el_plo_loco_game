class Endboss extends MovableObject {
	y = 60;
	width = 400;
	height = 400;
	energy = 150;
	offset = {
		top: 70,
		bottom: 10,
		left: 60,
		right: 30,
	};
	IMAGES_ALERTA = [
		"img/4_enemie_boss_chicken/2_alert/G5.png",
		"img/4_enemie_boss_chicken/2_alert/G6.png",
		"img/4_enemie_boss_chicken/2_alert/G7.png",
		"img/4_enemie_boss_chicken/2_alert/G8.png",
		"img/4_enemie_boss_chicken/2_alert/G9.png",
		"img/4_enemie_boss_chicken/2_alert/G10.png",
		"img/4_enemie_boss_chicken/2_alert/G11.png",
		"img/4_enemie_boss_chicken/2_alert/G12.png",
	];
	IMAGES_WALKING = [
		"img/4_enemie_boss_chicken/1_walk/G1.png",
		"img/4_enemie_boss_chicken/1_walk/G2.png",
		"img/4_enemie_boss_chicken/1_walk/G3.png",
		"img/4_enemie_boss_chicken/1_walk/G4.png",
	];

	IMAGES_ATTACK = [
		"img/4_enemie_boss_chicken/3_attack/G13.png",
		"img/4_enemie_boss_chicken/3_attack/G14.png",
		"img/4_enemie_boss_chicken/3_attack/G15.png",
		"img/4_enemie_boss_chicken/3_attack/G16.png",
		"img/4_enemie_boss_chicken/3_attack/G17.png",
		"img/4_enemie_boss_chicken/3_attack/G18.png",
		"img/4_enemie_boss_chicken/3_attack/G19.png",
		"img/4_enemie_boss_chicken/3_attack/G20.png",
	];

	IMAGES_HURT = [
		"img/4_enemie_boss_chicken/4_hurt/G21.png",
		"img/4_enemie_boss_chicken/4_hurt/G22.png",
		"img/4_enemie_boss_chicken/4_hurt/G23.png",
	];

	ENDBOSS_DEAD = [
		"img/4_enemie_boss_chicken/5_dead/G24.png",
		"img/4_enemie_boss_chicken/5_dead/G25.png",
		"img/4_enemie_boss_chicken/5_dead/G26.png",
	];
	speed = 1.5;

	/**
	 *  Once a Endboss Object is created, its image path is stored in the src attribute of a newly created image object
	 *  using 'loadImage()' of the super constructor. Places them on fix X positions
	 */
	constructor() {
		super().loadImage(this.IMAGES_ALERTA[0]);
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_ALERTA);
		this.loadImages(this.IMAGES_ATTACK);
		this.loadImages(this.IMAGES_HURT);
		this.loadImages(this.ENDBOSS_DEAD);
		this.x = 2300; // Math.random() generiert nur eine zahl zwischen 0 - 1  z.B. 0,45
		this.animate();
		this.movement();
	}

	/**
	 * Depending on the distance or condition of the end boss, a suitable animation is played
	 */
	animate() {
		this.endbossAnimateInterval = setInterval(() => {
			if (this.energy <= 0) {
				this.speed = 0;
				this.playAnimation(this.ENDBOSS_DEAD);
			} else if (this.distanceTooClose()) {
				this.playAnimation(this.IMAGES_ATTACK);
			} else if (this.checkDistancePepeEndboss() || this.checkIfEndbossMoved()) {
				this.playAnimation(this.IMAGES_WALKING);
				this.endbossBarSize();
			} else {
				this.playAnimation(this.IMAGES_ALERTA);
			}
		}, 300);
		allIntervals.push(this.endbossAnimateInterval);
	}

	/**
	 * Size of the enbossBar and the heart
	 */
	endbossBarSize() {
		world.endbossBar.width = 250;
		world.endbossBarHeart.width = 80;
	}

	/**
	 * Checked if the caracter is too close to the boss
	 */
	distanceTooClose() {
		world.endboss.x - world.character.x <= 150;
	}

	/*
	 * Checked in the interval whether the character has come near the boss or he has met him
	 */
	movement() {
		this.endbossMovementInverval = setInterval(() => {
			if (this.checkDistancePepeEndboss() || (this.checkIfEndbossMoved() && this.energy > 0)) {
				this.moveLeft();
			}
		}, 1000 / 60);
		allIntervals.push(this.endbossMovementInverval);
	}

	/**
	 * Checks whether the character passes a certain X
	 * @returns true or falese
	 */
	checkDistancePepeEndboss() {
		return world.character.x > 1950;
	}
	/**
	 * Checks if the end boss has moved or taken damage
	 * @returns true or falese
	 */
	checkIfEndbossMoved() {
		return world.endboss.x < 2300 || this.energy < 149;
	}
}