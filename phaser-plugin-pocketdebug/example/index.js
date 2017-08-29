var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.load.baseURL = '//examples.phaser.io/';
  game.load.crossOrigin = 'anonymous';
  game.load.image('boxes', 'assets/sprites/block.png');
  game.load.image('dude', 'assets/sprites/phaser-dude.png');
}

function create() {
  pocketdebug = game.plugins.add(Phaser.Plugin.PocketDebug);
  pocketdebug.add(10,0,1,200,61,"FPS");
  pocketdebug.add(10,150,1,100,100,"MS");  

  game.time.events.loop(50,addSprite,this);

  dudes=game.add.group();
}

function update() {
  dudes.forEach(function(dude){dude.body.velocity.x+=0.08});
  game.physics.arcade.collide(dudes,dudes);
}

function render() {
}

function addSprite(){
  if(game.time.fps>20){
    child=game.add.sprite(game.width*Math.random(),game.height*Math.random(),'dude');
    game.physics.arcade.enable(child);
    child.body.velocity.x=Math.random()*1000;
    child.body.velocity.y=Math.random()*1000;
    
    child.body.collideWorldBounds=true;
    child.body.bounce.setTo(1);
    

    dudes.add(child);
  }else{
    dudes.forEach(function(dude){dude.destroy()});
  }

}
