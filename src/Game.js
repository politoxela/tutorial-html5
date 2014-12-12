Ball.Game = function (game) {
    keys = null;
    ball = null;
    walls = null;
    timer = 0;
    totalTimer = 0;
    loop = null;
    firstRun = true;
    level = 0;
    sfx_bounce = null;
    maxLevels = 5;
    audio = true;
};
Ball.Game.prototype = {
    create: function () {
        this.add.sprite(0, 0, 'screen-bg');
        panel = this.add.sprite(0, 0, 'panel');
        panel.body.immovable = true;

        //Agregando la pelota y el mecanismo de movimiento
        ball = this.add.sprite((320 - 22) / 2, 450, 'ball');
        ball.anchor.setTo(0.5, 0.5);
        ball.body.bounce.setTo(0.3, 0.3);
        ball.body.setCircle(10, 11, 11);
        ball.body.linearDamping = 1;

        keys = this.game.input.keyboard.createCursorKeys();

        var force = 10;

        //Controlando la pelota
        if (keys.left.isDown) {
            ball.body.velocity.x -= force;
        } else if (keys.right.isDown) {
            ball.body.velocity.x += force;
        }
        if (keys.up.isDown) {
            ball.body.velocity.y -= force;
        } else if (keys.down.isDown) {
            ball.body.velocity.y += force;
        }

        //La implementación de la API de Orientación del Dispositivo
        window.addEventListener("deviceorientation", this.handleOrientation, true);

        //Agregando el agujero
        hole = this.add.sprite((320 - 22) / 2, 90, 'hole');
        hole.body.immovable = true;
        hole.anchor.setTo(0.5, 0.5);
        hole.body.setCircle(5, 15, 15);

        //Construyendo los bloques del laberinto
        walls = this.game.add.group();
        walls.add(panel);

        walls.create(220 - 32, 480 - 128, 'element-h').body.immovable = true;
        walls.create(92, 480 - 128 - 32, 'element-w').body.immovable = true;
        walls.create(0, 240, 'element-w').body.immovable = true;
        walls.create(128, 240, 'element-w').body.immovable = true;
        walls.create(256, 240, 'element-h').body.immovable = true;
        walls.create(180, 58, 'element-h').body.immovable = true;
        walls.create(52, 154, 'element-w').body.immovable = true;

        //Detección de colisiones
        this.game.physics.collide(ball, walls, this.wallCollision, null, this);
        ball.body.collideWorldBounds = true;

        //Agregando el tiempo transcurrido
        timer = 0;
        timerText = this.game.add.text(15, 20, "Time: " + timer, {
            font: "24px Arial",
            fill: "#333333"
        });

        loop = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
    },

    updateCounter: function () {
        timer++;
        timerText.content = "Time: " + timer;
    },


    wallCollision: function () {},

    handleOrientation: function (e) {
        var x = e.gamma;
        var y = e.beta;
        ball.body.velocity.x -= x * 2;
        ball.body.velocity.y -= x * 2;
    }
};