
var PocketDebug =this.Phaser.Plugin.PocketDebug = function (game, parent)
{
  Phaser.Plugin.call(this, game, parent);
  this.name="Phaser Pocket Debug Plugin";
  this.panels=[];
  this.fastHexToRGB=function(hex,alpha){return 'rgba('+(hex>>16)+","+((hex>>8)&(0x0000ff))+","+(hex&0x0000ff)+","+alpha+")";
  };
  this.tickTimings={lastStart:0,start:0,ms:0};
  this.components={state: 0,stage: 0,tweens: 0,sound: 0,input: 0,physics: 0,particles: 0,plugins  : 0};
  this.timer = (window.performance ? window.performance : Date);
};

Phaser.Plugin.PocketDebug.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.PocketDebug.prototype.constructor = Phaser.Plugin.PocketDebug;

PocketDebug.prototype.init = function() 
{  
  this.game.time.advancedTiming = true;  
  this.addPanel(10,0,1,this);  
  
  for (var component in this.components) 
  {
    this.wrap(this.game, component, "update", component);
    this.panels[0].addGraph(60,10,false,component);        
  }
  
  
};
PocketDebug.prototype.addPanel = function(x,y,scale,maxY)
{
    this.panel=new Panel(x,y,scale,maxY,this);
    this.panels.push(this.panel);  
};

PocketDebug.prototype.update=function(){
  this.panels[0].update();
};

PocketDebug.prototype.destroy = function()
{
  for(var panel in this.panels)
  {
    this.game.canvas.parentNode.removeChild(this.panels[panel].content);    
    this.graphs[graph]=null;    
  }  
  Phaser.Plugin.prototype.destroy.apply(this,arguments);        
};

PocketDebug.prototype.wrap = function (obj, component, method, timingStat) {
  obj[component][method] = (function(self, name, method, stat, fn)
  {    
    var t0=t1=0;
    return function () 
    {
      t0 = self.timer.now();
      fn.apply(this, arguments);
      t1 = self.timer.now();
      self.components[stat] = t1 - t0;//edit this for multi
    }
  })(this, component, method, timingStat, obj[component][method]);
};
var Panel =function(x,y,scale,dbg)
{
    this.graphs=[];    
    this.dbg=dbg;
    this.game=dbg.game;
    this.hide=false;
    this.fontSize=14;
    this.width=340*scale;
    this.index=0;    
    this.txtc=0xffffff;this.bgc=0xff00ff;this.mask=0x000016;  
    this.content=this.addUI(x,y,260,scale,0xff00ff,false,"",this,this.shiftHue); 
    this.toggler=this.addUI(x,y,25,scale,0xffff00,true,"--",this,this.toggle);
    this.plus=this.addUI(x,y+20,25,scale,0x00ff00,true,"+",this,this.resize,1); 
    this.minus=this.addUI(x,y+40,25,scale,0xff0000,true,"-",this,this.resize,-1); 
    this.next=this.addUI(x,y+60,25,scale,0x0000ff,true,"->",this,this.change,1);  
    return this;
}

Panel.prototype.update=function(){
    this.content.textContent=this.current.update(this.dbg.components[this.current.label]);
}

Panel.prototype.addGraph=function(maxY,refreshRate,bits,label)
{
    this.graph=new Graph(this.game,maxY,refreshRate,bits,label);
    this.graphs.push(this.graph);   
    this.current=this.graph;
}

Panel.prototype.addUI=function(x,y,width,scale,bgcolor,UI,label,context,event,parameters)
{
    this.element=document.createElement("pre"); 
    this.element.setAttribute("style","position: absolute;left:"+(x+10)+"px;top:"+y+"px;width:"+(width*scale)+"px;text-align:center;color:white;font-weight:bold;font-size:"+11*scale+"px");
    this.game.canvas.parentNode.appendChild(this.element); 
    this.element.style["background-color"]=UI?this.dbg.fastHexToRGB(bgcolor,0.3):this.dbg.fastHexToRGB(bgcolor,0.6); 
    this.element.textContent=UI?label:0;
    this.element.onclick=event.bind(context,parameters);      
    return this.element;
};
Panel.prototype.shiftHue=function()
{
    this.mask=((this.mask<<1)&~0xff000000)||16;  
    this.bgc^=this.mask;
    this.txtc=~this.txtc;
    this.content.style["background-color"]=this.dbg.fastHexToRGB(this.bgc,0.6);
    this.content.style["color"]=this.dbg.fastHexToRGB(this.txtc,1);
}
Panel.prototype.toggle=function()
{  
    this.current.hide=!this.current.hide;
    this.content["hidden"]=this.current.hide;
}

Panel.prototype.resize=function(direction)
{
    this.width+=40*direction;
    this.fontSize+=1*direction;
    this.content.style["fontSize","width"]=[this.fontSize,this.width];
}

Panel.prototype.change=function()
{ 
    this.current.hide=true;
    this.index=(this.index+1)%(this.graphs.length);
    this.current=this.graphs[this.index];
    this.current.hide=false;
}  

var Graph = function (game,maxY,refreshRate,bits,label)
{
  this.game=game;
  this.refreshRate=refreshRate;
  this.maxY=maxY+1;
  this.label=label;
  this.bits=bits;
  this.hide=false;
  this.scanBinary=this.startBinary=0x010000000;this.zeros= Array(30).join("0"); this.counter=0;   
  this.line0=new Scanline(this,0);this.line1=new Scanline(this,1);
  this.line2=new Scanline(this,2);this.line3=new Scanline(this,3);
  this.line4=new Scanline(this,4);
  return this;
}
Graph.prototype.update =function(input)
{  
  this.counter=(this.counter+1)%this.refreshRate;
  if(!this.hide&&this.counter==0)
  {
    this.rownumber=~~((input)/(this.maxY/5));
    this.scanBinary=((this.scanBinary>>1))||this.startBinary;
    this.result=input;
  }
  return this.result;
};

var Scanline=function(gr,linenumber)
{
  this.gr=gr,this.linenumber=linenumber,this.binary=0;
  return  this;      
} 

Scanline.prototype.draw=function()
{
  this.binary=this.gr.scanBinary==1?0:(this.gr.rownumber== this.linenumber?(this.gr.scanBinary^this.binary):(this.binary&~this.gr.scanBinary));//this.binary=this.gr.scanBinary; 
  this.n=this.binary.toString(2);
  this.n=this.gr.bits?(this.gr.zeros.substr( this.n.length)+ this.n):(this.gr.zeros.substr( this.n.length)+ this.n).replace(/0/g, "_").replace(/1/g, '*');
  return this.n;
}