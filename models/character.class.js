class Character extends MovableObject {
	height = 250;
	width = 120;
	y = 170;
	speed = 5;
	offset = {
		top: 110,
		bottom: 10,
		left: 30,
		right: 30,
	};
	IMAGES_WALKING = [
		'./img/2_character_pepe/2_walk/W-21.png',
		'./img/2_character_pepe/2_walk/W-22.png',
		'./img/2_character_pepe/2_walk/W-23.png',
		'./img/2_character_pepe/2_walk/W-24.png',
		'./img/2_character_pepe/2_walk/W-25.png',
		'./img/2_character_pepe/2_walk/W-26.png',
	];
	IMAGES_JUMPING = [
		'img/2_character_pepe/3_jump/J-31.png',
		'img/2_character_pepe/3_jump/J-32.png',
		'img/2_character_pepe/3_jump/J-33.png',
		'img/2_character_pepe/3_jump/J-34.png',
		'img/2_character_pepe/3_jump/J-35.png',
		'img/2_character_pepe/3_jump/J-36.png',
		'img/2_character_pepe/3_jump/J-37.png',
		'img/2_character_pepe/3_jump/J-38.png',
		'img/2_character_pepe/3_jump/J-39.png',
	];
	IMAGES_DEAD = [
		'img/2_character_pepe/5_dead/D-51.png',
		'img/2_character_pepe/5_dead/D-52.png',
		'img/2_character_pepe/5_dead/D-53.png',
		'img/2_character_pepe/5_dead/D-54.png',
		'img/2_character_pepe/5_dead/D-55.png',
		'img/2_character_pepe/5_dead/D-56.png',
		'img/2_character_pepe/5_dead/D-57.png',
	];
	IMAGES_HURT = ['img/2_character_pepe/4_hurt/H-41.png', 'img/2_character_pepe/4_hurt/H-42.png', 'img/2_character_pepe/4_hurt/H-43.png'];
	IMAGES_SLEEPING = [
		'img/2_character_pepe/1_idle/long_idle/I-12.png',
		'img/2_character_pepe/1_idle/long_idle/I-13.png',
		'img/2_character_pepe/1_idle/long_idle/I-14.png',
		'img/2_character_pepe/1_idle/long_idle/I-15.png',
		'img/2_character_pepe/1_idle/long_idle/I-16.png',
		'img/2_character_pepe/1_idle/long_idle/I-17.png',
		'img/2_character_pepe/1_idle/long_idle/I-18.png',
		'img/2_character_pepe/1_idle/long_idle/I-19.png',
		'img/2_character_pepe/1_idle/long_idle/I-20.png',
	];
	IMAGES_WAITING = [
		'img/2_character_pepe/1_idle/idle/I-1.png',
		'img/2_character_pepe/1_idle/idle/I-2.png',
		'img/2_character_pepe/1_idle/idle/I-3.png',
		'img/2_character_pepe/1_idle/idle/I-4.png',
		'img/2_character_pepe/1_idle/idle/I-5.png',
		'img/2_character_pepe/1_idle/idle/I-6.png',
		'img/2_character_pepe/1_idle/idle/I-7.png',
		'img/2_character_pepe/1_idle/idle/I-8.png',
		'img/2_character_pepe/1_idle/idle/I-9.png',
		'img/2_character_pepe/1_idle/idle/I-10.png',
	];
	world;
	walking_sound = new Audio('audio/walking.mp3');
	jumping_sound = new Audio('audio/jump.mp3');

	/**
	 *  Once a Character Object is created, its image path is stored in the src attribute of a newly created image object
	 *  using 'loadImage()' of the super constructor
	 */
	constructor() {
		super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_JUMPING);
		this.loadImages(this.IMAGES_DEAD);
		this.loadImages(this.IMAGES_HURT);
		this.loadImages(this.IMAGES_SLEEPING);
		this.loadImages(this.IMAGES_WAITING);
		this.animate();
		this.applyGravaity();
		this.pepeStandingStill();
		this.pepeMovement();
	}

	/**
	 * Checks where the character is moving to in an interval
	 */
	pepeMovement() {
		this.pepeMovementInterval = setInterval(() => {
			this.walking_sound.pause();
			if (this.world.keyboard.RIGHT && this.x < this.world.endboss.x) {
				this.characterRightMovement();
			}
			if (this.world.keyboard.LEFT && this.x > 0) {
				this.characterLeftMovement();
			}
			if (this.world.keyboard.SPACE && !this.isAboveGround()) {
				this.characterJumpMovement();
			}
			this.cameraFollowCharacter();
		}, 1000 / 60);
		allIntervals.push(this.pepeMovementInterval);
	}

	/**
	 * Checks in the interval what the character is doing to play the appropriate animations
	 */
	animate() {
		this.animatonCharacterInterval = setInterval(() => {
			if (this.isDead()) {
				this.playAnimation(this.IMAGES_DEAD);
			} else if (this.isHurt()) {
				this.playAnimation(this.IMAGES_HURT);
			} else if (this.isAboveGround()) {
				this.playAnimation(this.IMAGES_JUMPING);
			} else if (this.leftRightMoving()) {
				this.playAnimation(this.IMAGES_WALKING);
			} else {
				this.pepeSleepingWaitingAnimations();
			}
		}, 100);
		allIntervals.push(this.animatonCharacterInterval);
	}

	/**
	 * The camera tracks the character
	 */
	cameraFollowCharacter() {
		this.world.camera_x = -this.x + 100;
	}

	/**
	 * Checks the last interaction with pepe and plays the appropriate animations
	 */
	pepeSleepingWaitingAnimations() {
		this.inactivePepe = new Date().getTime() - this.lastPepeAction;
		this.playAnimation(this.inactivePepe > 2000 ? this.IMAGES_SLEEPING : this.IMAGES_WAITING);
	}

	/**
	 * Checks the last interaction with pepe
	 */
	pepeStandingStill() {
		this.pepeStandingStillIntervall = setInterval(() => {
			if (this.noInteractionsWithPepe()) {
				this.lastPepeAction = new Date().getTime();
			}
		}, 100);
		allIntervals.push(this.pepeStandingStillIntervall);
	}

	/**
	 * Returns whether the appropriate keyboard key is pressed and the character is on the floor
	 * @returns true or falses
	 */
	leftRightMoving() {
		return this.world.keyboard.RIGHT || (this.world.keyboard.LEFT && !this.isAboveGround());
	}

	/**
	 * sets speedY to 20
	 */
	jump() {
		this.speedY = 20;
	}

	/**
	 * Character moves to the right.
	 * Sound is only played when it is muted == false
	 */
	characterRightMovement() {
		this.moveRight();
		this.otherDirection = false;
		this.playWalkingSound();
	}

	/**
	 * Character moves to the left.
	 * Sound is only played when it is muted == false
	 */
	characterLeftMovement() {
		this.moveLeft();
		this.otherDirection = true;
		this.playWalkingSound();
	}
	/**
	 * Character Jump.
	 * Sound is only played when it is muted == false
	 */
	characterJumpMovement() {
		this.walking_sound.pause();
		if (world.muted == false) {
			this.jumping_sound.play();
			this.jumping_sound.volume = 0.5;
		}
		this.jump();
	}

	playWalkingSound() {
		if (!world.muted) {
			this.walking_sound.play();
		} else {
			this.walking_sound.pause();
		}
	}

	/**
	 * Keyboard key to the right must be pressed and the X of the character must not be bigger than that of the end boss
	 * @returns true or false
	 */
	keyboardRight() {
		return this.world.keyboard.RIGHT && this.x < this.world.endboss.x;
	}

	/**
	 * Keyboard key to the left must be pressed and x must not be bigger than 0
	 * @returns  true or false
	 */
	keyboardLeft() {
		return this.world.keyboard.LEFT && this.x > 0;
	}

	/**
	 * Keyboard key Space must be pressed and must not be above the ground
	 * @returns  true or false
	 */
	keyboardJump() {
		return this.world.keyboard.SPACE && !this.isAboveGround();
	}

	/**
	 * Returns if there was an interaction with Pepe
	 * @returns  true or false
	 */
	noInteractionsWithPepe() {
		return (
			this.world.keyboard.RIGHT ||
			this.world.keyboard.LEFT ||
			this.world.keyboard.SPACE ||
			this.world.keyboard.ENTER ||
			this.isAboveGround() ||
			this.isHurt() ||
			this.isDead()
		);
	}
}