let canvas_p5;
let cv;
let c; //context
let random_x = [];
let random_y = [];
let random_r = [];
let noise_moutain = [];
let meteorArr = [];
let times = 0;	//run time

// the class of meteor
class Meteor{
	constructor(x,y) {
	  Object.assign(this,{x,y});
		this.number = 50;
		this.a = 255;
		this.isFinish = false;
	}
	display(){
		let r = 6;
		let x = this.x;
		let y = this.y;
		push();
		noStroke();
		for(let i = 0; i<this.number; ++i){
			fill(255,this.a-i*5);
			ellipse(x,y,r);
			x += 0.5;
			y -= 1;
			r -= 0.1;
		}
		pop();
	}
	check(){
		this.x -= 3;
		this.y += 6;
		this.a -= 5;
		if(this.a<=0){
			this.isFinish = true;
		}
	}
	displayThenCheck(){
		this.display();
		this.check();
	}
}

//setup
function setup() {
	canvas_p5 = createCanvas(windowWidth,windowHeight);
	canvas_p5.mouseClicked(addMeteor);//set clicked function
	cv = canvas_p5.canvas;//get canvas
	c = cv.getContext("2d");//get context for 2d
	setup_random();//calc
}

//draw
function draw() {
	backgroundByLinearGradient();//background
//	drawLake();
	drawStars();//stars
	displayThenCheckMeteor();
	drawMoutain();
	++times;
}

function drawMoutain(){
	push();
	beginShape();
	fill(0);
	stroke(0);
	vertex(0,height);
	for(let i in noise_moutain){
		vertex(i,height*0.8+noise_moutain[i]);
	}
	vertex(width,height);
	endShape(CLOSE);
	pop();
}

function drawLake(){
	push();
	noStroke();
	fill(150,10);
	ellipse(width/2,height,width*2,(height/4)*3);
	pop();
}

function backgroundByLinearGradient(){
	c.save();
	let colorLine = c.createLinearGradient(0,0,0,height);
	colorLine.addColorStop(0,'#1D0620');//Deep space color
	colorLine.addColorStop(0.85,'#39366D');//Star sky color
	c.fillStyle = colorLine;
	c.fillRect(0,0,width,height);
	c.restore();
}

function drawStars(){
	push();
	c.shadowColor = '#BECFFB';//Cold color for white and blue
	noStroke();
	fill('#F4FFFF');
	for(let i = 0; i<800; ++i){
		ellipse(random_x[i],random_y[i],random_r[i]);
	}
	pop();
}

function setup_random(){
	random_x = [];
	random_y = [];
	random_r = [];
	for(let i = 0; i<500; ++i){
		random_x.push(random(width));
		random_y.push(random(height));
		random_r.push(random(3));
	}
	for(let i = 0; i<width; ++i){
		noise_moutain.push(map(noise(i*0.01),0,1,-30,50));
	}
}

function displayThenCheckMeteor(){
	if(times%20 == 0){
		meteorArr.push(new Meteor(random(width),random(height/3)));
	}
	for(let i = 0; i<meteorArr.length; ++i){
		meteorArr[i].displayThenCheck();
		if(meteorArr[i].isFinish){
			meteorArr.splice(i,1);
		}
	}
}

function addMeteor(){
	meteorArr.unshift(new Meteor(mouseX,mouseY));
}

function windowResized(){
	//reset the canvas size
	resizeCanvas(windowWidth,windowHeight);
	setup_random();
}
