var timer2;
class Scene2 extends Phaser.Scene {
    constructor() {
        super({ key: "Scene2" });
    }

    preload() {

    }

    create() {
        postGameData(RecordID,Token, 2, 1,function(body){
            CurrentLevel = 2;
        });
        

        this.cameras.main.setBackgroundColor("#fff0d6");
        stage = 2;
        let scene = this;
        let number = 60;
        let display = document.querySelector("#timer");
        let displayRec = document.querySelector("#record");
        displayRec.innerHTML = record;
        let displaylevel = document.querySelector("#level");
        displaylevel.innerHTML = "關卡2";

        timer2 = setInterval(function () {
            number--;
            if (number <= 0) {
                scene.scene.start("Restart");
                clearInterval(timer2);
            }
            display.innerHTML = number;
        }, 1000);

        //設定玩家資訊
        this.player = new Player(
            this,
            50,
            83,
            "square"
        ).setInteractive().setBounce(0, 0).setCollideWorldBounds(true).setGravityY(0);
        this.player.body.onCollide = true;

        



        //設定方塊的物理性質
        this.squares = this.physics.add.staticGroup({
            key: 'obstacle2',
            repeat: 1,
            setXY: { x: 350, y: 16 }
        });

        this.squares.create(350, 411, 'obstacle2');
        this.squares.create(435, 277, 'obstacle2');
        this.squares.create(265, 148, 'obstacle2');

        // Phaser.Actions.SetXY(this.squares.getChildren(), 36, 36, 72);



        // Static bodies must be updated manually if their parent game objects are moved.
        this.squares.refresh();

        //設定碰撞
        this.physics.add.collider(this.player, this.squares);

        this.physics.world.on('collide', (gameObject1, body1) => {
            //碰撞後會發生的事
            gameObject1.setAlpha(0.5);
            body1.setAlpha(0.5);
            this.scene.start("Restart");
            clearInterval(timer2);
      
        });

        this.final = this.physics.add.sprite(650, 343, 'orangefinal');
        this.physics.add.overlap(
            this.final,
            this.player,
            this.player_touch_final,
            null,
            this
        );



        // 获取 Canvas 元素
        let canvas = this.sys.canvas;

        //滑鼠控制玩家
        this.input.setDraggable(this.player);

        this.input.on('drag', function (pointer, gameObj, dragX, dragY) {
            gameObj.x = dragX;
            gameObj.y = dragY;
        })

    }

    player_touch_final(final, player) {
        this.scene.start("Scene3");
        clearInterval(timer2);
        record++; 
        postGameData(RecordID,Token,2,2);
    }

    restart() {
        this.scene.start("Restart");
    }

    update() {
    }
}
