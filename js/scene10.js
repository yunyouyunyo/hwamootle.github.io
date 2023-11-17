var timer10;
class Scene10 extends Phaser.Scene {
    constructor() {
        super({ key: "Scene10" });
    }

    preload() {
        this.load.image("obstacle10", "/assets/obstacle10_工作區域 1.png");
    }

    create() {
        postGameData(RecordID,Token, 10, 1,function(body){
            CurrentLevel = 10;
        });
        

        this.cameras.main.setBackgroundColor("#fff0d6");   
        stage = 10;
        let scene = this;
        let number = 60;
        let display = document.querySelector("#timer");
        let displayRec = document.querySelector("#record");
        displayRec.innerHTML = record;
        let displaylevel = document.querySelector("#level");
        displaylevel.innerHTML = "關卡10";

        timer10 = setInterval(function () {
            number--;
            if (number <= 0) {
                scene.scene.start("Restart");
                clearInterval(timer10);
            }
            display.innerHTML = number;
        }, 1000);

        //設定玩家資訊
        this.player = new Player(
            this,
            35,
            214,
            "square_small"
        ).setInteractive().setBounce(0, 0).setCollideWorldBounds(true).setGravityY(0);
        this.player.body.onCollide = true;

        



        //設定方塊的物理性質
        this.squares = this.physics.add.staticGroup({
            key: 'obstacle10',
            repeat: 1,
            setXY: { x: 350, y: 90 }
        });

        this.squares.create(350, 427-92, 'obstacle10');
       

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
            clearInterval(timer10);
            
        });

        this.final = this.physics.add.sprite(700-35, 214, 'orangefinal').setScale(0.7);
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
        clearInterval(timer10);
        this.scene.start("End");
        
        let display = document.querySelector("#timer");
        display.innerHTML="0";
        record++;
        postGameData(RecordID,Token,10,3);
    }

    restart() {
        this.scene.start("Restart");
    }

    update() {
    }
}
