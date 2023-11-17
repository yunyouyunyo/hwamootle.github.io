var timer4;
class Scene4 extends Phaser.Scene {
    constructor() {
        super({ key: "Scene4" });
    }

    preload() {
    }

    create() {
        postGameData(RecordID,Token, 4, 1,function(body){
            CurrentLevel = 4;
        });
        

        this.cameras.main.setBackgroundColor("#fff0d6");
        stage = 4;
        let scene = this;
        let number = 60;
        let display = document.querySelector("#timer");

        let displayRec = document.querySelector("#record");
        displayRec.innerHTML = record;
        let displaylevel = document.querySelector("#level");
        displaylevel.innerHTML = "關卡4";

        timer4 = setInterval(function () {
            number--;
            if (number <= 0) {
                scene.scene.start("Restart");
                clearInterval(timer4);
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
            key: 'obstacle4',
            repeat: 1,
            setXY: { x: 125, y: 168 }
        });

        this.squares.create(283, 259, 'obstacle4');
        this.squares.create(428, 105, 'obstacle4292');
        this.squares.create(588, 234, 'obstacle4292');
        this.squares.create(577, 381, 'obstacle446');
        this.squares.create(432, 295, 'obstacle446');
        // this.squares.create(589,213,'obstacle3st');

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
            clearInterval(timer4);
      
        });

        this.final = this.physics.add.sprite(648, 380, 'orangefinal');
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
        // final和player碰撞後發生的事
        this.scene.start("Scene5");
        clearInterval(timer4);
        record++; 
        postGameData(RecordID,Token,4,2);
    }

    restart() {
        this.scene.start("Restart");
    }

    update() {
    }
}
