var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var intersectionsEllipse=[];
var intersectionsCircle=[];

function preload() {
    game.load.baseURL = '//examples.phaser.io/';
    game.load.crossOrigin = 'anonymous';
    //game.load.spritesheet('gameboy', 'assets/sprites/gameboy_seize_color_40x60.png', 40, 60);
    game.load.image('dude', 'assets/sprites/phaser-dude.png');
}

function create() {

  circle = new Phaser.Circle(game.world.centerX,100,128);
  ellipse = new Phaser.Ellipse(game.world.centerX, 300,320,128);
  
  handle1 = game.add.sprite(100, 200, 'dude', 0);
  handle1.anchor.set(0.5);
  handle1.inputEnabled = true;
  handle1.input.enableDrag(true);

  handle2 = game.add.sprite(600, 400, 'dude', 0); 
  handle2.anchor.set(0.5);
  handle2.inputEnabled = true;
  handle2.input.enableDrag(true);

  line1 = new Phaser.Line(handle1.x, handle1.y, handle2.x, handle2.y);
}

function update() {
  intersectionsEllipse=Phaser.Ellipse.intersectsLine(ellipse,line1,true);
  intersectionsCircle=Phaser.Circle.intersectsLine(circle,line1,true);  
  line1.fromSprite(handle1, handle2, false);
}

function render() {
  game.debug.geom(ellipse,'#ffcc66');  
  game.debug.geom(circle,'#ffcc66');  
  game.debug.geom(line1);
  
  intersectionsEllipse.forEach(function(point){game.debug.geom(point,'rgba(255,0,255,1)')});  
  intersectionsCircle.forEach(function(point){game.debug.geom(point,'rgba(255,0,255,1)')});  
  
  game.debug.text("intersects circle: "+Phaser.Circle.intersectsLine(circle,line1),32,32);
  game.debug.text("intersects ellipse: "+Phaser.Ellipse.intersectsLine(ellipse,line1),32,64);
}