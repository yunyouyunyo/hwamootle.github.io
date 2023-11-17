class Restart extends Phaser.Scene {
    constructor() {
        super({ key: "Restart" });
        this.button = null;
    }

    preload() {
        this.load.image("backgroundRestart", "/assets/background_restart_工作區域 1.png")
        this.load.image("buttons", "/assets/button_工作區域 1.png");

    }

    create() {
        postGameData(RecordID,Token,CurrentLevel,0);
        this.add.image(0, 0, "backgroundRestart").setOrigin(0, 0);
        var button = this.add.graphics();
        // button.fillStyle(0xffffff, 30); // 使用白色和透明度为0的颜色填充
        // button.fillRect(235, 190, 220, 50);
        button.setInteractive(new Phaser.Geom.Rectangle(200, 200, 200, 100), Phaser.Geom.Rectangle.Contains); // 设置按钮为可交互，并定义按钮的点击区域
        
        let controller = this;
        button.on('pointerdown', function () {
            console.log('按钮被点击了！');
            // 添加你想要执行的逻辑或功能
            controller.startgame();
        });
        // this.button = this.add.image(200, 250, 'buttons').setInteractive({ useHandCursor: true }).on("pointerup", () => { this.startgame(); });


    }

    startgame() {
        this.scene.start(`Scene${stage}`);
    }

    update() {

    }
}