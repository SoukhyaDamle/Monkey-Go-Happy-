var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","5ce44e39-12ac-4a66-88cf-a87a0ed6a180","33841f90-7a53-4346-b956-e51d1961959b"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":10,"looping":true,"frameDelay":12,"version":"kws7BbcM__yHHPsulHZLlAK9cXjk6CRN","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":1842},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"5ce44e39-12ac-4a66-88cf-a87a0ed6a180":{"name":"Banana","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png","frameSize":{"x":1080,"y":1080},"frameCount":1,"looping":true,"frameDelay":4,"version":"pppPQOTkR0f8RrmO651Bv33KgWR6czOa","loadedFromSource":true,"saved":true,"sourceSize":{"x":1080,"y":1080},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"Stone","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png","frameSize":{"x":512,"y":512},"frameCount":1,"looping":true,"frameDelay":4,"version":"1odMXNVNObGk3YhyY_RjL_atnlufzfC2","loadedFromSource":true,"saved":true,"sourceSize":{"x":512,"y":512},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var monkey = createSprite(100, 340, 20, 50);
var ground = createSprite(400, 350, 800, 10);
monkey.setAnimation("monkey");
monkey.scale = 0.15;
ground.x = ground.width/2;
ground.velocityX = -2;

var bananaGroup = createGroup();
var obstaclesGroup = createGroup();

var SurvivalTime = 0;
stroke("black");
textSize(20);
fill("black");


function draw() {
  background("white");
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  
  if (SurvivalTime >= 0) {
     SurvivalTime = SurvivalTime + Math.round(World.frameRate/60); 
    }
  
  monkey.collide(ground); 
  
  // resetGround();
  banana();
  obstacle();

  
  drawSprites();
  
  text("SurvivalTime: "+SurvivalTime, 100, 50);
}

// function resetGround() {
// if(ground.isTouching(leftEdge) === false) {
//   ground.x = 200;
// }
// }
 
function banana() {
  if(World.frameCount % 80 === 0) {
      var bananaS = createSprite(400, 250, 40,10);
      bananaS.y = randomNumber(120, 200);
      bananaS.setAnimation("Banana");
      bananaS.scale = 0.05;
      // bananaS.y = randomNumber(120, 200);
      bananaS.velocityX = -2;
      bananaS.lifetime = 200;
      monkey.depth = bananaS.depth+1;
      bananaGroup.add(bananaS);
  }
}

function obstacle() {
  if(World.frameCount %300 === 0) {
      var obstacleS = createSprite(400, 350, 10, 40);
      obstacleS.setAnimation("Stone");
      obstacleS.scale = 0.1;
      obstacleS.collide(ground);
      obstacleS.velocityX = -2;
      obstaclesGroup.add(obstacleS);
  }
}
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
