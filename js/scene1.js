var timer1;

class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: "Scene1" });
    }

    preload() {
        this.load.image("square_small", "/assets/evil_small_工作區域 1.png");
        this.load.image("square", "/assets/evil_工作區域 1.png");
        this.load.image("obstacle", "/assets/obstacle_工作區域 1.png");
        this.load.image("obstacle74", "/assets/obstacle_74px_工作區域 1.png");
        this.load.image("orangefinal", "/assets/final-03.png");
        this.load.image("obstacle2", "/assets/obstacle2-05.png");
        this.load.image("obstacle3", "/assets/obstacle3-02.png");
        this.load.image("obstacle3243", "/assets/obstacle3243px_工作區域 1.png");
        this.load.image("obstacle3st", "/assets/obstacle3stand_工作區域 1.png");
        this.load.image("obstacle4", "/assets/obstacle4_工作區域 1.png");
        this.load.image("obstacle4292", "/assets/obstacle4292px_工作區域 1.png");
        this.load.image("obstacle466", "/assets/obstacle466_工作區域 1.png");
        this.load.image("obstacle446", "/assets/obstacle446_工作區域 1.png");
        this.load.image("obstacle7560", "/assets/obstacle715x560_工作區域 1.png");
        this.load.image("obstacle7460", "/assets/obstacle715x460_工作區域 1.png");
        this.load.image("obstacle7430", "/assets/obstacle715x430_工作區域 1.png");
        this.load.image("obstacle7360", "/assets/obstacle730x360_工作區域 1.png");
        this.load.image("obstacle7357", "/assets/obstacle7357x30_工作區域 1.png");
        this.load.image("obstacle7287", "/assets/obstacle7287x30_工作區域 1.png");
        this.load.image("obstacle7180", "/assets/obstacle7_工作區域 1.png");
        this.load.image("obstacle917", "/assets/obstacle9_工作區域 1.png");
        this.load.image("obstacle917308", "/assets/obstacle917x308_工作區域 1.png");
        this.load.image("obstacle9256", "/assets/obstacle9265x49_工作區域 1.png");
        this.load.image("obstacle9560", "/assets/obstacle9560x49_工作區域 1.png");
        
    }

    create() {
        postGameData(RecordID,Token, 1, 1,function(body){
            CurrentLevel = 1;
        });
        

        this.cameras.main.setBackgroundColor("#fff0d6");
        let scene = this;
        let number = 60;
        let display = document.querySelector("#timer");
        let displayRec = document.querySelector("#record");
        let displaylevel = document.querySelector("#level");
        displaylevel.innerHTML = "關卡1";
        displayRec.innerHTML = record;

         timer1 = setInterval(function () {
            number--;
            if (number <= 0) {
                scene.scene.start("Restart");
                clearInterval(timer1);
            }

            display.innerHTML = number;
        }, 1000);


        stage = 1;

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
            key: 'obstacle',
            repeat: 1,
            setXY: { x: 350, y: 16 }
        });

        this.squares.create(350, 411, 'obstacle');

        this.squares.create(260, 214, 'obstacle74');

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
            clearInterval(timer1);
            // this.add.text(250, 150, "GameOver!", {
            //     fontSize: "64px",
            //     color: "#ff0000"
            //   });
            //   this.clickButton=this.add.text(500,200,'[Restart GAME]',{fontSize:'數值px',color:'顏色'}).setInteractive({useHandCursor:true}).on('pointerup',()=>{
            //     this.restart();
            // });
        });

        this.final = this.physics.add.sprite(50, 320, 'orangefinal');

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
        this.scene.start("Scene2"); 
        record++;  
        clearInterval(timer1);
        postGameData(RecordID,Token,1,2);
        
             
    }

    restart() {
        this.scene.start("Restart");
    }

    update() {
        
    }
}
