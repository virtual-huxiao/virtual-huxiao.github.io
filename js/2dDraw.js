let UP_MAX = 15;
let DOWN_MAX = -15
let MOVE = 0;
let STEP = -0.5;

let GREEN = 255;
let COLOR_NOISE = 0;

let VECTOR_NOISE = 0;
let VECTOR_ARR = [];
let COLOR_ARR = [];

let COUNT = 10;
let TIME = -1;
function setup() {
  let cv = createCanvas(windowWidth, windowHeight);
	//cv.style('display','block');
	strokeJoin(ROUND);
	makeColorArr(COLOR_ARR,COUNT);
	makePositionArr(VECTOR_ARR,COUNT,width/2,height/2,0);
	strokeWeight(5);
}

function draw() {
  background(0);
	stroke(255);
	++TIME;
	if(TIME%20 == 0){
		createColor(COLOR_ARR,COUNT);	
	}
	
	drawAllHalfRhombUp(200,COUNT,100,VECTOR_ARR,COLOR_ARR);
	
	noStroke();
	translate(width/2,height/2+MOVE);
  drawPlaneBox(150,color(199,21,133),color(179,21,133),color(229,21,133));
	translate(-1*width/2,-1*(height/2+MOVE));
	
	drawAllHalfRhombDown(200,COUNT,100,VECTOR_ARR,COLOR_ARR);
	
	MOVE += STEP;
	checkLimit();
	checkPositon(VECTOR_ARR,COUNT,5,0.05);
}

//绘制2D正方体
function drawPlaneBox(sideLength,fillColorTop,fillColorLeft,fillColorRight){
  let v1 = createVector(0,0);
  let v2 = p5.Vector.fromAngle(radians(-30),sideLength);
  let v3 = createVector(0,-1*sideLength);
  let v4 = p5.Vector.fromAngle(radians(-150),sideLength);
  let v5 = createVector(v4.x,v4.y+sideLength);
  let v6 = createVector(0,sideLength);
  let v7 = createVector(v2.x,v2.y+sideLength);
  //绘制顶层
  fill(fillColorTop);
  drawVertexRect(v1,v2,v3,v4);
  //绘制左侧
  fill(fillColorLeft)
  drawVertexRect(v1,v4,v5,v6);
  //绘制右侧
  fill(fillColorRight)
  drawVertexRect(v1,v2,v7,v6);
}

//绘制任意矩形函数
function drawVertexRect(v1,v2,v3,v4){
  beginShape();
  vertex(v1.x,v1.y);
  vertex(v2.x,v2.y);
  vertex(v3.x,v3.y);
  vertex(v4.x,v4.y);
  endShape(CLOSE);
}

//绘制一半菱形
function drawHalfRhombUp(sideLength){
	let sqrt_3 = sqrt(3);
	line((sqrt_3/2)*sideLength,0,
				0,-1*sideLength/2);
	line(0,-1*sideLength/2,
				-1*(sqrt_3/2)*sideLength,0)
}
function drawHalfRhombDown(sideLength){
	let sqrt_3 = sqrt(3);
	line((sqrt_3/2)*sideLength,0,
				0,sideLength/2);
	line(0,sideLength/2,
				-1*(sqrt_3/2)*sideLength,0)
}

//绘制所有的"一半菱形"
function drawAllHalfRhombUp(start,count,addTo,vectorArr,colorArr){
	for(let i = 0; i<count; ++i){
		translate(vectorArr[i].x,vectorArr[i].y);
		stroke(colorArr[i]);
		drawHalfRhombUp((i+1)*addTo+addTo);
		translate(-1*vectorArr[i].x,-1*vectorArr[i].y);
	}
}
function drawAllHalfRhombDown(start,count,addTo,vectorArr,colorArr){
	for(let i = 0; i<count; ++i){
		translate(vectorArr[i].x,vectorArr[i].y);
		stroke(colorArr[i]);
		drawHalfRhombDown((i+1)*addTo+addTo);
		translate(-1*vectorArr[i].x,-1*vectorArr[i].y);
	}
}

//检测超界
function checkLimit(){
	if(MOVE <= DOWN_MAX || MOVE >= UP_MAX){
		STEP *= -1;
	}
}

//颜色生成器(使用三角函数)
function createColor(arr,count){
	let cgreen;
	for(let i = 0; i<count; ++i){
		cgreen = stepByCOLOR_RANGE();
		arr[i] = color(255,cgreen,255);
	}
}
function makeColorArr(arr,count){
	let cgreen;
	for(let i = 0; i<count; ++i){
		cgreen = stepByCOLOR_RANGE();
		arr.push((255,cgreen,255));
	}
}
function stepByCOLOR_RANGE(){
	COLOR_NOISE += 5;
	return sin(COLOR_NOISE)*200;
}

//坐标生成器
function makePositionArr(arr,count,startX,startY,startAdd){
	let a = 2*PI/count;
	for(let i =0; i<count; ++i){
		arr.push(createVector(startX,startY,i*a+startAdd));
	}
	return a;
}
//坐标增值器
function checkPositon(arr,count,len,add){
	for(let i =0; i<count; ++i){
		arr[i].y += cos(arr[i].z)*len;
		arr[i].z += add;
	}
}