var sceneCtrl;


class Start extends Phaser.Scene {
    constructor() {
        super({ key: "Start" });
        this.button = null;
    }

    preload() {
        this.load.image("backgroundStart", "/assets/start-04.png");
        this.load.audio("music", "/music/Tree_-_unVoid.mp3");

    }

    create() {
        postGameData(null, null, null, null, function (body) {
            Token = body.Token;
            RecordID = body.RecordID;
        });

        this.background_music = this.sound.add('music', { loop: true });
        this.background_music.play({
            volume: 0.8
        });

        this.add.image(0, 0, "backgroundStart").setOrigin(0, 0);
        var button = this.add.graphics();
        button.fillStyle(0xffffff, 0); // 使用白色和透明度为0的颜色填充
        button.fillRect(0, 0, 700, 427);
        button.setInteractive(new Phaser.Geom.Rectangle(0, 0, 700, 427), Phaser.Geom.Rectangle.Contains); // 设置按钮为可交互，并定义按钮的点击区域

        let controller = this;
        button.on('pointerdown', function () {
            console.log('按钮被点击了！');
            // 添加你想要执行的逻辑或功能
            controller.startgame();
        });
        this.textStart = this.add.text(180, 180, "開始遊戲", { fill: '#96775e', fontSize: '82px', align: 'center' })

        sceneCtrl = this.scene;
   
        this.tweens.add({
            targets: this.textStart,
            alpha: 0, // 目标透明度为0（完全透明）
            duration: 1000, // 动画持续时间为2000毫秒（2秒）
            yoyo: true, // 在动画结束后反向播放
            repeat: -1 // 无限循环
          });

    }

    startgame() {
        this.scene.start('Scene1');
    }

    update() {
       
    }
}