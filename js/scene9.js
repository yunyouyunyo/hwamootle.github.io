var timer9;
class Scene9 extends Phaser.Scene {
    constructor() {
        super({ key: "Scene9" });
    }

    preload() {
    }

    create() {
        postGameData(RecordID,Token, 9, 1,function(body){
            CurrentLevel = 9;
        });
        

        this.cameras.main.setBackgroundColor("#fff0d6");   
        stage = 9;
        let scene = this;
        let number = 60;
        let display = document.querySelector("#timer");
        let displayRec = document.querySelector("#record");
        displayRec.innerHTML = record;
        let displaylevel = document.querySelector("#level");
        displaylevel.innerHTML = "關卡9";

        timer9 = setInterval(function () {
            number--;
            if (number <= 0) {
                scene.scene.start("Restart");
                clearInterval(timer9);
            }
            display.innerHTML = number;
        }, 1000);

        //設定玩家資訊
        this.player = new Player(
            this,
            35,
            35,
            "square_small"
        ).setInteractive().setBounce(0, 0).setCollideWorldBounds(true).setGravityY(0);
        this.player.body.onCollide = true;

        



        //設定方塊的物理性質
        this.squares = this.physics.add.staticGroup({
            key: 'obstacle917',
            repeat: 1,
            setXY: { x: 700-78, y: 189 }
        });

        this.squares.create(700-165, 119, 'obstacle917');
        this.squares.create(700-252, 189, 'obstacle917');
        this.squares.create(700-339, 119, 'obstacle917');
        this.squares.create(78, 154, 'obstacle917308');
        this.squares.create(254, 213, 'obstacle9256');
        this.squares.create(184, 94, 'obstacle9256');
        this.squares.create(350,427-98,'obstacle9560');

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
            clearInterval(timer9);
      
        });

        this.final = this.physics.add.sprite(120, 35, 'orangefinal').setScale(0.7);
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
        this.scene.start("Scene10");
        clearInterval(timer9);
        record++;
        postGameData(RecordID,Token,9,2);
    }

    restart() {
        this.scene.start("Restart");
    }

    update() {
    }
}
