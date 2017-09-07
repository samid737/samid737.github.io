
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.baseURL = '//examples.phaser.io/';
    game.load.crossOrigin = 'anonymous';
    game.load.image('contra2', 'assets/pics/contra2.png');
    game.load.image('bunny', 'assets/sprites/bunny.png');
    game.load.image('block', 'assets/sprites/block.png');
    game.load.image('wizball', 'assets/sprites/wizball.png');

    game.load.physics('physicsData', 'assets/physics/sprites.json');

}

var contra;
var bunny;
var block;
var wizball;


function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution=1;
    
    contra = game.add.sprite(100, 100, 'contra2');
    bunny = game.add.sprite(550, 150, 'bunny');
    block = game.add.sprite(300, 400, 'block');
    wizball = game.add.sprite(400, 500, 'wizball');
    capsule= game.add.sprite(300,200);
    plane =game.add.sprite(300,100);

    game.physics.p2.enable([ contra, bunny ], true);
    game.physics.p2.enable([ block, wizball ,capsule,plane], true);
    bunny.body.static=true;
    contra.body.static=true;


    wizball.body.collideWorldBounds=true;
    wizball.body.velocity.x=wizball.body.velocity.y=-1000;
    capsule.body.clearShapes();
    capsule.body.addCapsule(40,20,0,0,0);

    plane.body.clearShapes();
    plane.body.addLine(40,0,0,0);
    plane.body.velocity.y=-1000;

    //  Circle
    wizball.body.setCircle(45,0,0,Math.PI/6);

    //block/rectangle
    block.body.setRectangle(45,90,0,0,0);
    console.log(block.body.rotation);
    

    //  Convex polys
    contra.body.clearShapes();
    contra.body.loadPolygon('physicsData', 'contra2',1);

    bunny.body.clearShapes();
    bunny.body.loadPolygon('physicsData', 'bunny',1,5);

    game.input.onDown.add(addShapes,this);
}

function update() {

    bunny.body.rotateLeft(10);
}

function render() {
game.debug.text("click to add bodies",32,23);

}

function addShapes(){
    bunny.body.addCapsule(40,20,-100+Math.random()*100,-100+Math.random()*100,2);
    plane.body.addCapsule(40,20,-100+Math.random()*100,-100+Math.random()*100,2);
    wizball.body.addLine(40,0,-100+Math.random()*100,0);
    bunny.body.addCapsule(40,20,-100+Math.random()*100,-100+Math.random()*100,2); 
    block.body.setRectangle(45,30,0,0,1);
    block.body.addLine(60+Math.random()*30,10,-200+Math.random()*300,Math.random());
    
}

