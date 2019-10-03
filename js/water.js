let utils;
let cp;
let x,y;
let maxN = 1;
let t = 0;
let arrStep = [0,1];
let arrColor = ['blue','LightSkyBlue'];
let bg ;

//预加载文件
function preload(){
}

//总/首选项设置
function setup() {
	let cv = createCanvas(windowWidth, windowHeight);
	utils = cv.canvas.getContext('2d');
	utils.shadowColor="black";
	utils.shadowOffsetX = 20;
	utils.shadowOffsetY = 20;
	bg = utils.createRadialGradient(0,0,0,0,0,400);
	bg.addColorStop(arrStep[0],arrColor[0]);
	bg.addColorStop(arrStep[1],arrColor[1]);

}

function draw() {
	translate(width/2,height/2);
	background('RosyBrown');
	drawWater();
}

//屏幕自适应
function windowResized() {
 	resizeCanvas(windowWidth, windowHeight);
}

function drawWater(){
	push();
	utils.fillStyle = bg;
	  beginShape();
	  for(let i = 0; i<2*PI; i+=0.1){
		  let xoff = map(cos(i),-1,1,0,maxN);
		  let yoff = map(sin(i),-1,1,0,maxN);
		  let r = map(noise(xoff,yoff,t*0.001),0,1,300,400);
		  x = r*cos(i);
		  y = r*sin(i);
		  vertex(x,y);
		  t += 0.1;
	  }
	  endShape(CLOSE);
	  utils.fill();
	pop();
}