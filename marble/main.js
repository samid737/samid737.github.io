var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

	game.load.physics("physics", "assets/spiral.json");
	game.load.image("spiral","assets/spiral.png")
    
}

function create() {
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.gravity.y=-100;
	spiral = game.add.sprite(400,300,'spiral');
	game.physics.p2.enable(spiral, true);
	spiral.body.data.gravityScale=0;
	spiral.body.static=true;
	spiral.body.clearShapes();
	spiral.body.loadPolygon("physics", "spiral");

	ball = game.add.sprite(400,600);
	game.physics.p2.enable(ball, true);
	ball.body.setCircle(10);
	
}

function update() {
	game.physics.p2.gravity.y=game.input.activePointer.y-game.world.centerY;
	game.physics.p2.gravity.x=game.input.activePointer.x-game.world.centerX;
}
