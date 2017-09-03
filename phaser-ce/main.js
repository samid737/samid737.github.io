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
  intersectionsEllipse=intersectsLine(ellipse,line1,true);
  intersectionsCircle=intersectsLine(circle,line1,true);
  
  line1.fromSprite(handle1, handle2, false);
}

function render() {
  game.debug.geom(ellipse,'#ffcc66');  
  game.debug.geom(circle,'#ffcc66');  
  game.debug.geom(line1);
  
  intersectionsEllipse.forEach(function(point){game.debug.geom(point,'rgba(255,0,255,1)')});  
  intersectionsCircle.forEach(function(point){game.debug.geom(point,'rgba(255,0,255,1)')});  
  
  game.debug.text("intersects circle: "+intersectsLine(circle,line1),32,32);
  game.debug.text("intersects ellipse: "+intersectsLine(ellipse,line1),32,64);
  
}





function intersectsLine(ellipse,line,returnpoints){
  // ellipse: ((x - h)/(a*a))^2 + ((y - k)/(b*b))^2 = 1
  // line: y = m * x + n
  // h: x value of circle centre
  // k: y value of circle centre
  // m: slope
  // n: y-intercept
  var h=ellipse.x;
  var k=ellipse.y;
  var m=((line.end.y-line.start.y)/(line.end.x-line.start.x));
  var n= line.end.y- (m*line.end.x);
  
  if(ellipse instanceof Phaser.Ellipse){
    var a= ellipse.width/2;
    var b= ellipse.height/2;
  }else{
    var a=ellipse.radius;
    var b=ellipse.radius;
  }
  var del= n+m*h;

  var x0=( h*(b*b)- m*(a*a) * (n-k) +  a*b* (Math.sqrt((a*a)*(m*m)+(b*b)-(del*del)-(k*k) + (2*del*k))))/((a*a)*(m*m)+(b*b));
  var x1=( h*(b*b)- m*(a*a) * (n-k) -  a*b* (Math.sqrt((a*a)*(m*m)+(b*b)-(del*del)-(k*k) + (2*del*k))))/((a*a)*(m*m)+(b*b));
    
  var y0= m*x0 + n;
  var y1=m*x1 +n;
  var p0= new Phaser.Point(x0,y0);
  var p1= new Phaser.Point(x1,y1);
  
  if(line.pointOnSegment(p0.x,p0.y,0.01)||line.pointOnSegment(p1.x,p1.y,0)){
      return returnpoints?[p0,p1]:true;          
    }else{
      return returnpoints?[]:false;
    }
}
