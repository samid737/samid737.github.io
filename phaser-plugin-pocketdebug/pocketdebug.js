
var PocketDebug =this.Phaser.Plugin.PocketDebug = function (game, parent)
{
  Phaser.Plugin.call(this, game, parent);
  this.name="Phaser Pocket Debug Plugin";
  this.graphs={};
  this.fastHexToRGB=function(hex,alpha){return 'rgba('+(hex>>16)+","+((hex>>8)&(0x0000ff))+","+(hex&0x0000ff)+","+alpha+")";
  };
  this.tickTimings={lastStart:0,start:0,ms:0};

  this.components={
    state    : 0,
    stage    : 0,
    tweens   : 0,
    sound    : 0,
    input    : 0,
    physics  : 0,
    particles: 0,
    plugins  : 0
  },
  this.timer = (window.performance ? window.performance : Date);
};

Phaser.Plugin.PocketDebug.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.PocketDebug.prototype.constructor = Phaser.Plugin.PocketDebug;

PocketDebug.prototype.init = function() 
{  
  for (var component in this.components) {
    this._wrap(this.game, component, "update", component);
  }
  this.game.time.advancedTiming = true;
  this.add(10,0,1,60,10,"FPS",null);  
  this.add(10,100,1,100,10,"MS",null); 
  this.add(10,200,1,100,10,"physics",null); 
  this.add(10,300,1,100,10,"input",null); 

};

PocketDebug.prototype.addDOM=function(x,y,width,scale,maxY,bgcolor,UI,label,event)
{
    this.element=document.createElement("pre"); 
    this.element.setAttribute("style","background-color:"+this.fastHexToRGB(bgcolor,0.6)+"; position: absolute;left:"+x+"px;top:"+y+"px;width:"+(width*scale)+"px;text-align:center;color:white;font-weight:bold;font-size:"+14*scale+"px");
    this.game.canvas.parentNode.appendChild( this.element); 
    this.element.style["resize"]=UI?"":'both';
    this.element.style["overflow"]=UI?"":'auto';    
    this.element.textContent=UI?label:0;      
    return this.element;
};
PocketDebug.prototype.add = function(x,y,scale,maxY,refreshRate,label,input,bitMode)
{
  this.gr=new Graph(this,game,x,y,scale,maxY,refreshRate,label,bitMode);
  this.gr.node=this.addDOM(x,y,340,scale,maxY,0xff00ff); 
  this.gr.toggler=this.addDOM(x,y,40,scale,maxY,0xffff00,true,"--");
  this.gr.plus=this.addDOM(x,y+20,40,scale,maxY,0x00ff00,true,"+"); 
  this.gr.minus=this.addDOM(x,y+40,40,scale,maxY,0xff0000,true,"-"); 
  this.gr.toggler.onclick=this.gr.toggle.bind(this.gr);
  this.gr.plus.onclick=this.gr.resize.bind(this.gr,1);  
  this.gr.minus.onclick=this.gr.resize.bind(this.gr,-1);  
  this.gr.node.onclick=this.gr.shiftHue.bind(this.gr);
  this.graphs[this.gr.label]=this.gr; 
  return this.gr;
};

PocketDebug.prototype.update=function(){
  this.graphs["FPS"].draw(this.game.time.fps);
  this.graphs["MS"].draw(this.game.time.totalElapsedSeconds());
  this.graphs["physics"].draw(this.components["physics"]);
  this.graphs["input"].draw(this.components["input"]);
  this.graphs["input"].draw(this.components["input"]);  
}

PocketDebug.prototype.destroy = function()
{
  for(var graph in this.graphs)
  {
    this.game.canvas.parentNode.removeChild(this.graphs[graph].node);    
    this.game.canvas.parentNode.removeChild(this.graphs[graph].toggler);
    this.graphs[graph]=null;    
  }  
  Phaser.Plugin.prototype.destroy.apply(this,arguments);        
};


PocketDebug.prototype._wrap = function (obj, component, method, timingStat) {
  obj[component][method] = (function(self, name, method, stat, fn)
  {    
    var start = 0,end = 0;
    return function () 
    {
      start = self.timer.now();
      fn.apply(this, arguments);
      end = self.timer.now();
      self.components[stat] = end - start;//edit this for multi
      console.log(end-start+name);
    }
  })(this, component, method, timingStat, obj[component][method]);
};

var Graph = function (debug,game,x,y,scale,maxY,refreshRate,label,bitMode)
{
  this.plugin=debug;this.game=game,this.scale=scale,this.refreshRate=refreshRate,this.maxY=maxY+1,this.label=label,this.hide=false;this.bitMode=bitMode;this.fontSize=14;this.width=340*scale;this.dragging=-1;
  this.txtc=0xffffff;this.bgc=0xff00ff;this.mask=0x000016;  
  this.scanBinary=this.startBinary=0x010000000;this.zeros= Array(30).join("0"); this.counter=0;   
  this.line0=new Scanline(this,0);this.line1=new Scanline(this,1);
  this.line2=new Scanline(this,2);this.line3=new Scanline(this,3);
  this.line4=new Scanline(this,4);
  return this;
}

Graph.prototype.draw =function(input)
{  
  this.counter=(this.counter+1)%this.refreshRate;
  if(!this.hide&&this.counter==0)
  {
    this.input=input;
    this.rownumber=~~((this.input)/(this.maxY/5));
    this.scanBinary=((this.scanBinary>>1))||this.startBinary;
    this.result=this.line4.draw()+'\n'+this.line3.draw()+'\n'+this.line2.draw()+'\n'+this.line1.draw()+'\n'+this.line0.draw()+'\n';
    this.result+=this.input+" "+this.label+ " DC: "+this.game.renderer.renderSession.drawCount;
    this.node.textContent=this.result;
  }
};

Graph.prototype.shiftHue=function()
{
  this.mask=((this.mask<<1)&~0xff000000)||16;  
  this.bgc^=this.mask;
  this.txtc=~this.txtc;
  this.node.style["background-color"]=this.plugin.fastHexToRGB(this.bgc,0.6);
  this.node.style["color"]=this.plugin.fastHexToRGB(this.txtc,1);
}

Graph.prototype.toggle=function()
{  
  this.hide=!this.hide;
  this.node["hidden"]=this.hide;
}

Graph.prototype.resize=function(direction){
  this.width+=40*direction;
  this.fontSize+=1*direction;
  this.node.style["fontSize"]=this.fontSize;
  this.node.style["width"]=this.width;
}

var Scanline=function(gr,linenumber)
{
  this.gr=gr,this.linenumber=linenumber,this.binary=0;
  return  this;      
} 

Scanline.prototype.draw=function()
{
  this.binary=this.gr.scanBinary==1?0:(this.gr.rownumber== this.linenumber?(this.gr.scanBinary^this.binary):(this.binary&~this.gr.scanBinary));//this.binary=this.gr.scanBinary; 
  this.n=this.binary.toString(2);
  this.n=this.gr.bitMode?(this.gr.zeros.substr( this.n.length)+ this.n):(this.gr.zeros.substr( this.n.length)+ this.n).replace(/0/g, "_").replace(/1/g, '*');
  return this.n;
}