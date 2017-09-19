var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var bg1;
var bg2;
var lerpCount=0;
var counter=0;
var count=false;
var color_index=0;

var duration=150;

var spaceBar;

var colorData=['0xff0000','0x00ff00','0xff00ff','0xfff000'];

function preload() {
     game.load.baseURL = '//examples.phaser.io/';
    game.load.crossOrigin = 'anonymous';
    //game.load.spritesheet('gameboy', 'assets/sprites/gameboy_seize_color_40x60.png', 40, 60);
    game.load.image('object', 'assets/sprites/phaser-dude.png');
}

function create() {
    var bmd= game.add.bitmapData(600,600);
    var bmd2=game.add.bitmapData(600,600);
    var bmd3= game.add.bitmapData(600,600);
    bmd.rect(0,0,600,600,'rgb(255,255,255)');
    bmd2.rect(0,0,400,400,'rgb(255,255,255)');
    //  Make our Sprite use this BitmapData as a texture
    bg1 = game.add.sprite(150, 150, bmd);
    bg2 = game.add.sprite(200, 200, bmd2);
  
    bg1.tint=colorData[0];
    bg2.tint=colorData[0];
        //game.time.events.loop(Phaser.Timer.SECOND*0.25, addScore, this);
    spaceBar =game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceBar.onDown.add(lerp, game);
}

function update() {
    timer();
}

function render() {
    game.debug.text('press space to lerp to next color (inner =RGB, outer =HSV',32,32);
    game.debug.text('lerpCount:'+lerpCount,32,64);
    game.debug.text('activate counter:'+count,32,96);
    game.debug.text('counter:'+counter,32,128);

}

function timer(){
    if(count){
        counter+=1;
        count=counter>duration-1?count=false:count=true; 
        switchColor(color_index,counter);
    }else{
        counter=0;
    }
}

function lerp(){
    lerpCount+=1;
    if(lerpCount%1==0){
        if(!count){
            count=true;
            color_index+=1;
        }
    }
}

function switchColor(index,currentStep){
    bg1.tint = Phaser.Color.interpolateColor(colorData[index-1],colorData[index],duration,counter,1,0);
    bg2.tint = Phaser.Color.interpolateColor(colorData[index-1],colorData[index],duration,counter,0,0);
}

