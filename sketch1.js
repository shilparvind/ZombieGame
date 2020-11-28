var bg, zombieImg, player, playerImg;
var zombieGroup, edges;
var bulletImg, bullet, bulletGroup;
var score = 0;

function preload() {
  playerImg = loadImage("Riffle_small.png");
  bulletImg = loadImage("bullet.png");

  bulletLeftImg = loadImage("bullet_left.png");
  bulletDownImg = loadImage("bullet_down.png");
  bulletUpImg = loadImage("bullet_up.png");
  bulletRightImg = loadImage("bullet_right.png");

  zombieImg = loadImage("walk_up.png");
  zombieLeftImg = loadImage("walk_Left.png");
  zombieRightImg = loadImage("walk_Right.png");
  zombieUpImg = loadImage("walk_up.png");
  zombieDownImg = loadImage("walk_Down.png");
}

function setup() {
  createCanvas(1000, 650);

  //boundary = createSprite(width/2,310, width,20);
  edges = createEdgeSprites();
  player = createSprite(300, 110, 10, 10);
  player.rotation = 0;
  player.addImage(playerImg);
  player.scale = 0.5;
  player.debug = true;
  player.setCollider("rectangle", -40, 0, 150, 50);
  zombieGroup = new Group();
  bulletGroup = new Group();
}

function draw() {
  background("green");

  text(mouseX + "," + mouseY, mouseX, mouseY);

  //To display Score
  fill("black");
  textFont("Algerian");
  textSize(25);
  text("SCORE: " + score, 850, 45);

  spawnZombie();
  var objB = bullet();

  //To fire the bullets
  if (keyWentDown("space")) {
    switch (player.rotation) {
      case 90:
        objB.velocityY = 5;
        objB.addImage(bulletDownImg);
        break;
      case -90:
        objB.velocityY = -5;
        objB.addImage(bulletUpImg);
        break;
      case 180:
        objB.addImage(bulletLeftImg);
        objB.velocityX = -5;
        break;
      case 360:
        objB.addImage(bulletRightImg);
        objB.velocityX = 5;
        break;
    }
  }

  if (keyDown("down")) {
    player.y = player.y + 10;
    player.rotation = 90;
  }

  if (keyDown("up")) {
    player.y = player.y - 10;
    player.rotation = -90;
  }

  if (keyDown("left")) {
    player.x = player.x - 10;
    player.rotation = 180;
  }

  if (keyDown("right")) {
    player.x = player.x + 10;
    player.rotation = 360;
  }

  if (bulletGroup.isTouching(edges)) {
    bulletGroup.destroyEach();
  }

  //Scoring
  for (var i = 0; i < zombieGroup.length; i++) {
    if (zombieGroup.get(i).isTouching(bulletGroup)) {
      zombieGroup.get(i).destroy();
      score++;
    }
  }

  //Zombies moving along with the player in xAxis
  for (var i = 0; i < zombieGroup.length; i++) {
    // right;
    if (player.x - zombieGroup.get(i).x > 9) {
      zombieGroup.get(i).velocityX = random(1, 4);
      zombieGroup.get(i).addImage(zombieRightImg);
    }

    //left
    else if (player.x - zombieGroup.get(i).x < -9) {
      zombieGroup.get(i).velocityX = random(-1, -4);
      zombieGroup.get(i).addImage(zombieLeftImg);
    }

    //If the player.x === zombie.x, then player goes up or down;
    else {
      console.log("Same");
      if (zombieGroup.get(i).y - player.y < 0) {
        zombieGroup.get(i).velocityY = random(1, 4);
        console.log("Down ");
        zombieGroup.get(i).addImage(zombieDownImg);
      } else if (zombieGroup.get(i).y - player.y > 0) {
        zombieGroup.get(i).velocityY = random(-1, -4);
        console.log("up ");
        zombieGroup.get(i).addImage(zombieUpImg);
      }
    }
  }

  createEdgeSprites();
  player.bounce(edges);
  zombieGroup.collide(edges);

  drawSprites();
}

function spawnZombie() {
  if (frameCount % 20 === 0) {
    var zombie = createSprite(random(25, 925), random(50, 600), 30, 30);
    zombie.addImage(zombieImg);
    zombie.scale = 0.5;
    zombie.velocityY = random(-1, -3);
    zombieGroup.add(zombie);
    zombie.rotation = 0;
    zombie.lifetime = 1000;
  }
}

function bullet() {
  var bullet = createSprite(player.x - 5, player.y, 2, 2);
  bullet.scale = 0.3;
  bullet.setCollider("rectangle", 0, 0, 30, 30);
  bulletGroup.add(bullet);
  bullet.lifetime = 200;
  return bullet;
}
