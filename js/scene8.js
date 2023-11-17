var timer8;
class Scene8 extends Phaser.Scene {
    constructor() {
        super({ key: "Scene8" });
    }

    preload() {
        this.load.image("obstacle8", "/assets/obstacle8_工作區域 1.png");
    }

    create() {    
        postGameData(RecordID,Token, 8, 1,function(body){
            CurrentLevel = 8;
        });
        

        this.cameras.main.setBackgroundColor("#fff0d6");   
        stage = 8;
        let scene = this;
        let number = 60;
        let display = document.querySelector("#timer");
        let displayRec = document.querySelector("#record");
        displayRec.innerHTML = record;
        let displaylevel = document.querySelector("#level");
        displaylevel.innerHTML = "關卡8";
        
        timer8 = setInterval(function () {
            number--;
            if (number <= 0) {
                scene.scene.start("Restart");
                clearInterval(timer8);
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
            key: 'obstacle8',
            repeat: 1,
            setXY: { x: 87, y: 178 }
        });

        this.squares.create(192, 427-178, 'obstacle8');
        this.squares.create(297, 178, 'obstacle8');
        this.squares.create(700-297, 427-178, 'obstacle8');
        this.squares.create(700-192, 178, 'obstacle8');
        this.squares.create(700-87, 427-178, 'obstacle8');
        

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
            clearInterval(timer8);
      
        });

        this.final = this.physics.add.sprite(700-35, 427-35, 'orangefinal').setScale(0.7);
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
        this.scene.start("Scene9");
        clearInterval(timer8);
        record++;
        postGameData(RecordID,Token,8,2);
    }

    restart() {
        this.scene.start("Restart");
    }

    update() {
    }
}
