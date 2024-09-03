// Add JS herelet canvas;
let world;
let keyboard = new Keyboard();
let game_over_sound = new Audio('audio/game-over.mp3');
let game_winner_sound = new Audio('audio/you-win.mp3');
let gameFinish = false;
let allIntervals = [];

/**
 *  Starts the game and initiates the levels
 */
function startGame() {
	document.getElementById('canvas').classList.remove('d-none');
	document.getElementById('muteButton').classList.remove('d-none');
	document.getElementById('fullscreenButton').classList.remove('d-none');
	document.getElementById('buttonsLeft').classList.remove('d-none');
	document.getElementById('buttonsRight').classList.remove('d-none');
	document.getElementById('startScreen').classList.add('d-none');
	initLevel();
	init();
}

/**
 * Opens the game instructions
 */
function openHowToPlay() {
	document.getElementById('mainHTP').classList.remove('d-none');
}

/**
 * Close the game instructions
 */
function closeHowToPlay() {
	document.getElementById('mainHTP').classList.add('d-none');
}

/**
 * initiates the Canvas world
 */
function init() {
	canvas = document.getElementById('canvas');
	world = new World(canvas, keyboard);
}

/**
 * When the player has won, the winnerscreen comes up and sets gameFinish to True so that no bugs occur.
 */
function gameWinnerScreen(muted) {
	if (gameFinish == false) {
		world.character.walking_sound.pause();
		world.background_sound.pause();
		keyboard.MUTE = true;
		allIntervals.forEach(clearInterval);
		if (!muted) {
			game_winner_sound.play();
			game_winner_sound.volume = 0.4;
		}
		document.getElementById('endFullscreen').classList.add('d-none');
		document.getElementById('fullscreenButton').classList.add('d-none');
		document.getElementById('muteButton').classList.add('d-none');
		document.getElementById('canvas').classList.add('d-none');
		document.getElementById('endMuteButton').classList.add('d-none');
		document.getElementById('buttonsLeft').classList.add('d-none');
		document.getElementById('buttonsRight').classList.add('d-none');
		document.getElementById('gameWinnerScreen').classList.remove('d-none');
		gameFinish = true;
	}
}

/**
 * When the player has lose, the overrscreen comes up and sets gameFinish to True so that no bugs occur. finishes all intervals
 */
function gameOverScreen(muted) {
	if (gameFinish == false) {
		stopIngameSounds();
		allIntervals.forEach(clearInterval);
		if (!muted) {
			game_over_sound.play();
			game_over_sound.volume = 0.4;
		}
		document.getElementById('endFullscreen').classList.add('d-none');
		document.getElementById('fullscreenButton').classList.add('d-none');
		document.getElementById('muteButton').classList.add('d-none');
		document.getElementById('canvas').classList.add('d-none');
		document.getElementById('buttonsLeft').classList.add('d-none');
		document.getElementById('buttonsRight').classList.add('d-none');
		document.getElementById('endMuteButton').classList.add('d-none');
		document.getElementById('gameOverScreen').classList.remove('d-none');
		gameFinish = true;
	}
}

/**
 * stops all game sounds
 */
function stopIngameSounds() {
	keyboard.MUTE = true;
	world.character.walking_sound.pause();
	world.background_sound.pause();
}

/**
 * reloads the page
 */
function backToStartScreen() {
	world.resetGame();
	keyboard.MUTE = false;
	document.getElementById('canvas').classList.add('d-none');
	document.getElementById('muteButton').classList.add('d-none');
	document.getElementById('fullscreenButton').classList.add('d-none');
	document.getElementById('gameOverScreen').classList.add('d-none');
	document.getElementById('buttonsLeft').classList.add('d-none');
	document.getElementById('buttonsRight').classList.add('d-none');
	document.getElementById('gameWinnerScreen').classList.add('d-none');
	document.getElementById('startScreen').classList.remove('d-none');
	gameFinish = false;
}

/**
 * Set the game to mute and change the MuteIcon
 */
function muteGame() {
	document.getElementById('endMuteButton').classList.remove('d-none');
	document.getElementById('muteButton').classList.add('d-none');
	keyboard.MUTE = true;
}

/**
 * Removes the mute and changes the MuteIcon
 */
function endMuteGame() {
	document.getElementById('muteButton').classList.remove('d-none');
	document.getElementById('endMuteButton').classList.add('d-none');
	keyboard.MUTE = false;
}

/**
 * Set the game to fullscreen and change the fullscreen icon.
 */
function fullscreenGame() {
	let fullscreen = document.getElementById('fullscreen');
	document.getElementById('endFullscreen').classList.remove('d-none');
	document.getElementById('fullscreenButton').classList.add('d-none');
	enterFullscreen(fullscreen);
}

/**
 * Resets the fullscreeen and changes the icon
 */
function endFullscreenGame() {
	let endfullscreen = document.getElementById('fullscreen');
	document.getElementById('fullscreenButton').classList.remove('d-none');
	document.getElementById('endFullscreen').classList.add('d-none');
	exitFullscreen(endfullscreen);
}

/**
 * Set Fullscreen (Source) https://wiki.selfhtml.org/wiki/JavaScript/Fullscreen
 * @param {HTML-Element} element - HTML-ID Which DIV should become fullscreen
 */
function enterFullscreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.msRequestFullscreen) {
		// for IE11 (remove June 15, 2022)
		element.msRequestFullscreen();
	} else if (element.webkitRequestFullscreen) {
		// iOS Safari
		element.webkitRequestFullscreen();
	}
}

/**
 * Go out of fullscreen mode
 */
function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
}

/**
 * A key operation is simulated and returns true and false
 * @param {Number} keyCode -  keyCode of the pressed key
 * @param {String} type - From event if keydown or keyup
 */
function simulateKeyPressed(keyCode, type) {
	let e = document.createEvent('HTMLEvents');
	e.initEvent(type, true, false);
	e.keyCode = keyCode;
	document.dispatchEvent(e);

	const isPressed = type === 'keydown';

	updateKeyState(e.keyCode, isPressed);
}

function updateKeyState(keyCode, isPressed) {
	switch (keyCode) {
		case 39: // Right arrow
		case 68: // D
			keyboard.RIGHT = isPressed;
			break;
		case 37: // Left arrow
		case 65: // A
			keyboard.LEFT = isPressed;
			break;
		case 32: // Space
			keyboard.SPACE = isPressed;
			break;
		case 13: // Enter
			keyboard.ENTER = isPressed;
			break;
	}
}

window.addEventListener('keydown', (e) => {
	updateKeyState(e.keyCode, true);
});

window.addEventListener('keyup', (e) => {
	updateKeyState(e.keyCode, false);
});