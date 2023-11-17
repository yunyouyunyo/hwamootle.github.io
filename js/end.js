class End extends Phaser.Scene {
    constructor() {
        super({ key: "End" });
    }

    preload() {
        this.load.image("backgroundEnd", "/assets/background_end-02.png")
    }

    create() {
        this.add.image(0, 0, "backgroundEnd").setOrigin(0, 0);
        let displayRec = document.querySelector("#record");
        displayRec.innerHTML = record;
    }


    update() {

    }
}