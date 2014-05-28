

var sankeGame = {
		direction:"r",
		dimension:10,
		snake_array:[],
		score:0,
		canvas:{},
		ctx:{},
		food:{}
};


function create_snake()
	{
		var length = 5; //Length of the snake
		sankeGame.snake_array = []; //Empty array to start with
		for(var i = length-1; i>=0; i--)
		{
			//This will create a horizontal snake starting from the top left
			sankeGame.snake_array.push({x: i*10, y:0});
		}
	}
	
	//Lets create the food now
	function create_food()
	{
		sankeGame.food = {
			x: Math.round(Math.random()*(44))*10, 
			y: Math.round(Math.random()*(44))*10, 
		};
		//This will create a cell with x/y between 0-44
		//Because there are 45(450/10) positions accross the rows and columns
	}
	function init()
	{
		sankeGame.direction="r";
		create_snake();
		create_food(); 
		sankeGame.score = 0;

	}
		function paint_cell(x, y)
	{
		ctx.fillStyle = "blue";
		ctx.fillRect(x, y, sankeGame.dimension, sankeGame.dimension);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x, y, sankeGame.dimension, sankeGame.dimension);
	}
$(function(){
		canvas = document.getElementById('game');
	    ctx = canvas.getContext('2d');
	setInterval(gameloop, 60);
	init();
	$(document).keydown(function(e){
		var key = e.which;
		//We will add another clause to prevent reverse gear
		if(key == "37" && sankeGame.direction != "r") sankeGame.direction = "l";
		else if(key == "38" && sankeGame.direction != "d") sankeGame.direction = "u";
		else if(key == "39" && sankeGame.direction != "l") sankeGame.direction = "r";
		else if(key == "40" && sankeGame.direction != "u") sankeGame.direction= "d";
		//The snake is now keyboard controllable
	})
});



function clear(ctx) {
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}
function gameloop() {
//To avoid the snake trail we need to paint the BG on every frame
		//Lets paint the canvas now

		var width = canvas.width;
	    var height = canvas.height;
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, width, height);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0,  width, height);
		
		//The movement code for the snake to come here.
		//The logic is simple
		//Pop out the tail cell and place it infront of the head cell
		var nx = sankeGame.snake_array[0].x;
		var ny = sankeGame.snake_array[0].y;
		//These were the position of the head cell.
		//We will increment it to get the new head position
		//Lets add proper direction based movement now
		if(sankeGame.direction == "r") nx+=10;
		else if(sankeGame.direction == "l") nx-=10;
		else if(sankeGame.direction == "u") ny-=10;
		else if(sankeGame.direction == "d") ny+=10;
		
		//Lets add the game over clauses now
		//This will restart the game if the snake hits the wall
		//Lets add the code for body collision
		//Now if the head of the snake bumps into its body, the game will restart
		if( check_collision(nx, ny, sankeGame.snake_array))
		{
			//restart game
			init();
			//Lets organize the code a bit now.
			return;
			
		}else if(nx == -10 ){
		nx=width-10;
		}else if( nx == width){
		nx=0;
		}else if(ny == -10 ){
		ny=height-10;
		}else if( ny == width){
		ny=0;
		}
		
		//Lets write the code to make the snake eat the food
		//The logic is simple
		//If the new head position matches with that of the food,
		//Create a new head instead of moving the tail
		if(nx == sankeGame.food.x && ny == sankeGame.food.y)
		{
			var tail = {x: nx, y: ny};
			sankeGame.score++;
			//Create new food
			create_food();
		}
		else
		{
			var tail = sankeGame.snake_array.pop(); //pops out the last cell
			tail.x = nx; tail.y = ny;
		}
		//The snake can now eat the food.
		
		sankeGame.snake_array.unshift(tail); //puts back the tail as the first cell
		
		for(var i = 0; i < sankeGame.snake_array.length; i++)
		{
			var c = sankeGame.snake_array[i];
			//Lets paint 10px wide cells
			paint_cell(c.x, c.y);
		}
		
		//Lets paint the food
		paint_cell(sankeGame.food.x, sankeGame.food.y);
		//Lets paint the score
		var score_text = "Score: " + sankeGame.score;
		ctx.fillText(score_text, 5, height-5);
		ctx.fillText(sankeGame.food.x+" "+sankeGame.food.y, 100, height-5);
}

	function check_collision(x, y, array)
	{
		//This function will check if the provided x/y coordinates exist
		//in an array of cells or not
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
	
	
