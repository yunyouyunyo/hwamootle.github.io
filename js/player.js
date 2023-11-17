class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name) {
        super(scene, x, y, name);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.setCollideWorldBounds(true);
    }
}