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
        ball = this.add.sprite((320-22)/2,450,'ball');
        ball.anchor.setTo(0.5,0.5);
        ball.body.bounce.setTo(0.3,0.3);
        ball.body.setCircle(10, 11, 11);
        ball.body.linearDamping = 1;
        
        keys = this.game.input.keyboard.createCursorKeys();
        
        var force = 10;
        
        if(keys.left.isDown){
            ball.body.velocity.x -= force;
        }
        else if(keys.right.isDown){
            ball.body.velocity.x += force;
        }
        if(keys.up.isDown){
            ball.body.velocity.y -= force;
        }
        else if(keys.down.isDown){
            ball.body.velocity.y += force;
        }
    }
};