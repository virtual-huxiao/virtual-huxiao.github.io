let arr = [];
let COLOR ;
function preload(){
	
}

//总/首选项设置
function setup() {
	let cv = createCanvas(windowWidth,windowHeight);
	cv.mouseClicked(modify);
	COLOR = color(0,0,0);
	noStroke();
	//createDebris(10,{x:width/2,y:height/2},COLOR,arr);
}

function draw() {
	this.background(COLOR);
	for(let i in arr){
		arr[i].displayThenCheck();
		if(arr[i].finish){
			arr.splice(i,1);
		}
	}
}

function modify(){
	createDebris(10,{x:mouseX,y:mouseY},COLOR,arr);
	COLOR = color(random(256),random(256),random(256));
}
