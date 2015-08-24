// Some variables to measure around the canvas
var TILE_WIDTH = 101;
var TOP_AREA = 60;
var TILE_HEIGHT = 83;

// Enemies our player must avoid
var Enemy = function() {
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = -110; // default start position for enemies
  this.currentCol = 0;
  this.currentRow = 2; // default row when an enemy is generated
  this.speed = 100; // default speed for enemies
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x < 550) { // while the bugs on the screen
    this.x = this.x + dt * this.speed; // make each enemy move the right based on their own speed and the dt offset

    if ((this.x > (-TILE_WIDTH + 15)) && (this.x < (TILE_WIDTH - 15))) { // check if this bug is in the 1st column
      this.currentCol = 1;
      if ((player.currentCol == this.currentCol) && (this.currentRow == player.currentRow)) { // check for collision between bug and player
        reset(); // reset game if there is a collision
      }
    }

    if ((this.x > 15) && (this.x < (2 * TILE_WIDTH - 15))) { // check if this bug is in the 2nd column
      this.currentCol = 2;
      if ((player.currentCol == this.currentCol) && (this.currentRow == player.currentRow)) { // check for collision between bug and player
        reset(); // reset game if there is a collision
      }
    }

    if ((this.x > (TILE_WIDTH + 15)) && (this.x < (3 * TILE_WIDTH - 15))) { // check if this bug is in the third column
      this.currentCol = 3;
      if ((player.currentCol == this.currentCol) && (this.currentRow == player.currentRow)) { // check for collision between bug and player
        reset(); // reset game if there is a collision
      }
    }

    if ((this.x > (2 * TILE_WIDTH + 15)) && (this.x < (4 * TILE_WIDTH - 15))) { // check if this bug is in the 4th column
      this.currentCol = 4;
      if ((player.currentCol == this.currentCol) && (this.currentRow == player.currentRow)) { // check for collision between bug and player
        reset(); // reset game if there is a collision
      }
    }

    if ((this.x > (3 * TILE_WIDTH + 15)) && (this.x < (5 * TILE_WIDTH - 15))) { // check if this bug is in the fifth column
      this.currentCol = 5;
      if ((player.currentCol == this.currentCol) && (this.currentRow == player.currentRow)) { // check for collision between bug and player
        reset(); // reset game if there is a collision
      }
    }

  } else {
    this.x = -110; // return the enemy to its starting position
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = TILE_WIDTH * 2; // Start on the 3rd column
  this.currentCol = 3;
  this.y = TOP_AREA + TILE_HEIGHT * 3; // Start on the 5th row
  this.currentRow = 5;
};

// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function() {
  // Reset the game if the player makes it to the top row
  if (this.currentRow == 1) {
    reset(); // Reset the game
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
  // Set trackers for where the player was before moving

  if (direction == 'left') {
    if (this.x > 0) { // ensure that we don't go past the first column
      this.x = this.x - TILE_WIDTH;
      this.currentCol = this.currentCol - 1;
    }
  }

  if (direction == 'up') {
    if (this.y > 0) { // ensure that we don't go past the first row
      this.y = this.y - TILE_HEIGHT;
      this.currentRow = this.currentRow - 1;
    }
  }

  if (direction == 'right') {
    if (this.x < TILE_WIDTH * 4) { // ensure that we don't go past the last column
      this.x = this.x + TILE_WIDTH;
      this.currentCol = this.currentCol + 1;
    }
  }

  if (direction == 'down') {
    if (this.y < (TILE_HEIGHT * 4 + TOP_AREA)) { // ensure that we don't go past the bottow row
      this.y = this.y + TILE_HEIGHT;
      this.currentRow = this.currentRow + 1;
    }
  }
};

Player.prototype.reset = function() {
  this.x = TILE_WIDTH * 2; // Start on the 3rd column
  this.currentCol = 3;
  this.y = TOP_AREA + TILE_HEIGHT * 3; // Start on the 5th row
  this.currentRow = 5;
};

// Reset the game
function reset() {
  // Reset the player
  player.reset();

  // Reset the enemies
  enemyTop.x = -220; // Top row enemy starting position
  enemyMiddle.x = -110; // Middle row enemy starting position
  enemyBottom.x = -350; // Bottom row enemy starting position
};

// Now instantiate your objects.

// Instantiate each enemy
// Rows are counted from the top
var enemyTop = new Enemy();
enemyTop.y = 0 + TOP_AREA;
enemyTop.currentRow = 2;
enemyTop.x = -220; // Top row enemy starting position
enemyTop.speed = 200;

var enemyMiddle = new Enemy();
enemyMiddle.y = 0 + TOP_AREA + TILE_HEIGHT;
enemyMiddle.currentRow = 3;
// middle row enemy starting position and speed uses default values

var enemyBottom = new Enemy();
enemyBottom.y = 0 + TOP_AREA + TILE_HEIGHT * 2;
enemyBottom.currentRow = 4;
enemyBottom.x = -350; // Bottom row enemy starting position
enemyBottom.speed = 80;

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemyTop, enemyMiddle, enemyBottom];

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
