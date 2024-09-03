class Bottle extends MovableObject {
	width = 70;
	height = 70;
	offset = {
		top: 10,
		bottom: 10,
		left: 20,
		right: 20,
	};
	BOTTLE_IMAGE = ["img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

	/**
	 *  Once a bottle object with different x coordinates created, its image path is stored in the src attribute of a newly created image object
	 *  using 'loadImage()' of the super constructor
	 */
	constructor() {
		super().loadImage(this.BOTTLE_IMAGE[0]); // Aufruf der Methode loadImage des Ã¼bergeordneten Konstruktors
        this.x = 100 + Math.random() * 4 * 400; // ZufÃ¤llige X-Position fÃ¼r die Flasche
        this.y = 360; // Feste Y-Position fÃ¼r die Flasche
    
	}
}