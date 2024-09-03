class EndbossBarHeart extends DrawableObject {
	IMAGES_BOSSHEART = ["img/7_statusbars/3_icons/icon_health_endboss.png"];

	/**
	 *  Once a Endboss-Bar-Healt Object is created, its image path is stored in the src attribute of a newly created image object
	 *  using 'loadImage()' of the super constructor. 
	 */
	constructor() {
		super().loadImage(this.IMAGES_BOSSHEART[0]); 
		this.x = 430;
		this.y = 5;
		this.width = 0;
		this.height = 80;
	}
}