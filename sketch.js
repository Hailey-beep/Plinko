const Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
//var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight=300;
//Added score varable and game state
var score = 0;
var turns = 0;
var gameState = "start";
var particle;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }


    
}
 


function draw() {
  background("black");
  textSize(20)
  //Added score and turns left
  text("Score: "+score,20,30);
  text("turns left: "+(5-turns),650,30);
  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }

   
     if(particle!=null) {
        particle.display();

       if(particle.body.position.y > 760) {

        turns++;
        gameState = "start";

        if(particle!=null && particle.body.position.x < 300) {
          score=score+500;
          particle = null;
        }
        if(particle!=null && particle.body.position.x > 300 && particle.body.position.x < 600) {
          score=score+100;
          particle = null;
        }
        if(particle!=null && particle.body.position.x > 600 && particle.body.position.x < 900) {
          score=score+200;
          particle = null;
        }
       }
     }
   
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
   
   //Added the text for the divisions
   push()
   textSize(30)
   textAlign(CENTER)
   for(var i=0; i<4; i++) {
     text("500",40+80*i,535);
   }
   for(var i=0; i<3; i++) {
     text("100",360+80*i,535);
     text("200",600+80*i,535);
   }
   pop()

   //Varable count
   if(turns>=5) {
     gameState = "end";
   }

   if(gameState === "end") {
     push()
     textSize(100)
     fill("red")
     text("GameOver", 150, 300);
     pop()
   }
}

//Added the function to make particles
function mousePressed() {

  if(gameState === "start" && mouseX < 800) {
    particle = new Particle(mouseX, 10, 10, 10);
    gameState = "drop";
  }
}
