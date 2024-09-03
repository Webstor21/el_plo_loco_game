class MovableObject extends DrawableObject {
	speed = 0.2;
	otherDirection = false;
	speedY = 0;
	acceleration = 2;
	lastHit = 0;
	reJump_sound = new Audio('audio/rejump.mp3');
	energy = 1000;
	offset = {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	};

	/**
	 * Pulls energy or remembers the last hit
	 */
	hit() {
		this.energy -= 1;
		if (this.energy < 0) {
			this.energy = 0;
		} else {
			this.lastHit = new Date().getTime();
		}
	}

	/**
	 * When the character is on the ground, he is pushed back and lifted slightly into the air
	 */
	hitsBack() {
		this.x -= 1;
		if (this.world.character.y >= 160) {
			this.speedY = 20;
		}
	}

	/**
	 * When the character jumps on the head of an enemy, flies again easily into the air
	 */
	headJump() {
		if (world.muted == false) {
			this.reJump_sound.play();
			this.reJump_sound.volume = 0.2;
		}
		this.speedY = 10;
	}

	/**
	 * It is looked when the character was hurt the last time
	 * @returns past time
	 */
	isHurt() {
		let timepassed = new Date().getTime() - this.lastHit;
		timepassed = timepassed / 1000;
		return timepassed < 1;
	}

	/**
	 * Checks if the energy is at 0
	 * @returns true or false
	 */
	isDead() {
		return this.energy <= 0;
	}

	/**
	 * Gravity to the right
	 */
	applyGravaity() {
		this.applyGravaityInterval = setInterval(() => {
			if (this.isAboveGround() || this.speedY > 0) {
				this.y -= this.speedY;
				this.speedY -= this.acceleration;
			}
		}, 1000 / 25);
		allIntervals.push(this.applyGravaityInterval);
	}

	/**
	 * Gravity to the left
	 */
	applyGravaityOtherDirection() {
		this.applyGravaityOtherDirectionInterval = setInterval(() => {
			if (this.isAboveGround() || this.speedY < 0) {
				this.y += this.speedY;
				this.speedY += this.acceleration;
			}
		}, 1000 / 25);
		allIntervals.push(this.applyGravaityOtherDirectionInterval);
	}

	/**
	 * Checks if it is above the ground
	 * @returns true if is a Throwable Object
	 */
	isAboveGround() {
		if (this instanceof ThrowableObjects) {
			return true;
		} else {
			return this.y < 170;
		}
	}

	/**
	 * Checks if a Obcejt colliding
	 * @param {Object} mo - MoveableObject -Chicken, Character, Endboss etc.
	 * @returns true if colliding
	 */
	isColliding(mo) {
		return (
			this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
			this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
			this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
			this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
		); // B => T
	}

	/**
	 * Movement to the right
	 */
	moveRight() {
		this.x += this.speed;
		this.otherDirection = false;
	}

	/**
	 * Movement to the left
	 */
	moveLeft() {
		this.x -= this.speed;
	}

	/**
	 *  Loops through an Array with paths of Images if it is called repeatedly with setInterval()
	 * @param {string} images  Array with contains paths of images
	 */
	playAnimation(images) {
		let i = this.currentImage % images.length;
		let path = images[i];
		this.img = this.imageCashe[path];
		this.currentImage++;
	}

	/**
	 * Jump in the air
	 */
	jump() {
		this.speedY = 35;
	}
}