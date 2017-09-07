var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

	game.load.image('contra2', 'assets/contra2.png');
    
	//	Load our physics data exported from PhysicsEditor
	game.load.physics('physicsData', 'assets/sprites.json');

}

var contra;
var start = false;

function create() {

	//	Enable p2 physics
	game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution=1;
	contra = game.add.sprite(400, 300, 'contra2');
    sprite1 = game.add.sprite(200, 100,);
    
	//	Enable the physics body on this sprite and turn on the visual debugger
	game.physics.p2.enable([sprite1,contra], true);
    sprite1.body.collideWorldBounds=true;

	//	Clear the shapes and load the 'contra2' polygon from the physicsData JSON file in the cache
	contra.body.clearShapes();
	contra.body.loadPolygon('physicsData', 'contra2');

	//	Just starts it rotating
  game.input.onDown.add(function() { start = true; }, this);

}

function update() {
	if (start)
	{
		contra.body.rotateLeft(5);
    sprite1.body.velocity.x=1000;
    sprite1.body.velocity.y=1000;
	}
}

function render() {

}