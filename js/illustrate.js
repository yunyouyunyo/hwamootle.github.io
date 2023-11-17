class Illustrate extends Phaser.Scene {
    constructor() {
        super({ key: "Illustrate" });
    }

    preload() {
        this.load.image("backgroundIllustrate", "/assets/background_illustrate-03.png")
    }

    create() {
        this.add.image(0, 0, "backgroundIllustrate").setOrigin(0, 0);
        
    }


    update() {

    }
}