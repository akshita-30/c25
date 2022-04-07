var rainarr = []; //EMPTY ARRAY for storing the objects

class raindrop{
  constructor(rx,rv,ra,rs){          //assigning important values
    //console.log("const. started");
    this.x = rx;
    var r = random();
    this.alpha = ra+20;   //opacity, you don't need to do '+ 20'
    this.scale = 5+rs*22; //size of text, you don't need to do '+ 5', and multiply with highest value you want
    this.velocity = rv*10;  //multiply with highest velocity you want, or you can do it on line 46 too
    this.y = -20;  //spawn text above the canvas
    if(r < 0.2){      //random() gives value between 0 - 1, so assigning random character/string according to r
      this.char = '1';
    }else if(r < 0.5){
      this.char = '0';
    }else if(r < 0.8){
      this.char = '!';
    }else if(r < 0.99){
      this.char = '#';
    }else{
      this.char = "rgb("+round((this.x/750)*255)+",100,"+round((this.y/750)*255)+")"; //just for fun hehe
      this.scale = 25;  //text size same for these ones
    }
    //console.log("x: "+this.x+"\ny: "+this.y+"\nchar: "+this.char+"\naplha: "+this.alpha+"\nvelocity: "+this.velocity);
    this.work();   //you can comment this, literally useless
    //console.log(this.velocity);
  }

  work(){   //quite self explanatory, using the values assigned in the constructor along with text, etc.
    //console.log("y: "+this.y+"\nfps: "+frameRate());
    //console.log("y: "+this.y);
    fill((this.x/750)*255,255,(this.y/750)*255,this.alpha);    //making the rbg values change according to x and y
    textStyle(NORMAL);
    noStroke();
    if(this.char !== '1' && this.char !== '0' && this.char !== '!' && this.char !== '#'){
      strokeWeight(1);
      textStyle(BOLD);
      stroke(255,255,255,100);
      fill((this.x/750)*255,100,(this.y/750)*255,255);   //no alpha value, so will have 100% opacity
      this.char = "rgb("+round((this.x/750)*255)+",100,"+round((this.y/750)*255)+")";
    }
    textSize(this.scale);
    text(this.char,this.x,this.y);
    if(this.y < 750){
      //console.log("y < 750")
      this.y += 50*(this.velocity+2)/frameRate();   //pretty much basic physics(v or s = d/t, and t = 1/frameRate() and v = this.velocity), you don't need to +2. multiply with highest value you want(here 50, seems decent to me)
    }
  }
}

function setup(){
  createCanvas(750,750);
  frameRate(144); //highest p5 supports is 144fps, since there will be a lot of objects being created, fps will drop. so i set it to higest value. after dropping, it stays around 90fps with occasional frame drops
}

function draw() {
  background(0,0,0); //BLACC baground
  //if(frameCount%50 === 0)
  rainarr.push(new raindrop(random(0,750),random(),random(0,255),random())); //pushing raindrop object. since i want the values to be random i'm using random(min,max) for all parameters
  for(var i = rainarr.length-1; i > 0; i -= 1){   //backward looping through the array since forward looping causes skipping if something is deleted
    rainarr[i].work();
    if(rainarr[i].y >= 750){  //bottom of canvas is 750 so i used 750. increase it(750) if you don't wan't the text to disappear while falling like in my video
      rainarr.splice(i,1);  //delete when y touches bottom of the canvas
    }
  }
  textSize(100);  //this part is just the big "RAINDROP" text
  fill(random()*255,random()*255,random()*255);  //random colour
  text("RAINDROPS!",70,frameCount+100);  //using frameCount as y since the text will keep going down 1px per frame, '+ 100; is for it to be fully on canvas when it starts
} //line 69 ;)
