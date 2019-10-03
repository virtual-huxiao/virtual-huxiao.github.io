let cv;//canvas
let cw = 585;//绘制的宽度
let LEN = cw/9;//方格长度
let ARR = [];//总数组

function setup() {
  cv = createCanvas(cw,800);//创建canvas
	cv.canvas.oncontextmenu = (() => {return false;});//取消右键
	textAlign(CENTER,CENTER);
	textSize(32);
	cv.mousePressed(click);
	background(239,235,225);
	setupArr();//初始化数组
	drawBg();//绘制背景
	drawRects();//绘制方格
	start_button();//绘制按钮
	drawText();//打印确定的数值
	noLoop();//结束draw
}

function start(){//总执行函数
	let n = 0;//用于判断解
	try{
		for(let i in ARR){
			if(ARR[i].isDisplay){
				++n;
				//线、块排除
				excludeNumber(i%9,Math.floor(i/9),ARR[i].number);
			}
		}
		if(n<17) throw "多解";//17为最小可解
		n=0;
	}catch(e){
		alert("多解或者无解");
	}
	check();//检测唯一的值
	drawText();//打印文字
}

function start_button(){//绘制start按钮
	push();
	rectMode(CENTER);
	fill(230,25,156);
	rect(width/2+4,cw+(height-cw)/2,100,50);
	fill(255);
	text("START",width/2+3,cw+(height-cw)/2+3);
	pop();
}

function drawBg(){//绘制背景
	push();
	fill(173,216,230);
	noStroke();
	rect(0,0,cw,cw);
	pop();
}

function drawRects(){//绘制方格
	push();
	stroke(0);
	for(let i = 0; i<=9; ++i){
		if(i%3==0){
			strokeWeight(4);
		}else{
			strokeWeight(2);
		}
		
		line(i*LEN,0,i*LEN,cw);
		line(0,i*LEN,cw,i*LEN);
	}
	pop();
}

function drawRect(indexX,indexY,color=150){//绘制单个的方格
	push();
	rectMode(CENTER);
	if(ARR[indexX+indexY*9].isDisplay){
		fill(color);
	}else{
		fill(173,216,230);//背景色
	}
	noStroke();
	rect(indexX*LEN+LEN/2,indexY*LEN+LEN/2,LEN,LEN);
	pop();
}

function click(){//点击事件判断
	if(mouseY>0&&mouseY<cw){//方格区为操作数独
		let indexX = Math.floor(mouseX/LEN);
		let indexY = Math.floor(mouseY/LEN);
		if(mouseButton == LEFT){
			ARR[indexX+indexY*9].number++;
		}
		if(mouseButton == RIGHT){
			ARR[indexX+indexY*9].number--;
		}
		drawRect(indexX,indexY);
		drawRects();		
		drawText();
	}else if(mouseX>250&&mouseY>665&&mouseX<350&&mouseY<720){//开始按钮区域
		start();
	}
}

function setupArr(){//初始化数组
	for(let i = 0; i<9*9; ++i){
		let j = Math.floor(i/9);
		ARR.push(new Number(i%9*LEN+LEN/2,j*LEN+LEN/2));
	}
	//测试数据
/* 	ARR[0].number = 8;
	ARR[2].number = 1;
	ARR[11].number = 3;
	ARR[15].number = 9;
	ARR[16].number = 7;
	ARR[21].number = 6;
	ARR[23].number =1;
	ARR[25].number =8;
	ARR[30].number = 8;
	ARR[32].number = 7;
	ARR[33].number = 1;
	ARR[37].number = 9;
	ARR[47].number = 2;
	ARR[50].number = 6;
	ARR[51].number = 3;
	ARR[57].number = 4;
	ARR[61].number = 2;
	ARR[62].number = 5;
	ARR[63].number = 5;
	ARR[64].number = 7;
	ARR[67].number = 3;
	ARR[73].number = 1;
	ARR[80].number = 4; */
}

function drawText(){//绘制数值
	push();
	for(let i in ARR){
		ARR[i].isDisplay?text(ARR[i].number.toString(),ARR[i].x,ARR[i].y):null;
	}
	pop();
}

function excludeNumber(indexX,indexY,number){//排除函数
	_excludeNumber_line(indexX,indexY,number);
	let x = Math.floor(indexX/3)*3;
	let y = Math.floor(indexY/3)*3;
	_excludeNumber_block(x,y,number);
	_excludeNumber_block(x,y+1,number);
	_excludeNumber_block(x,y+2,number);
}

function _excludeNumber_block(indexX,indexY,number){//块级排除
	if(!ARR[indexX+indexY*9].isDisplay){
		ARR[indexX+indexY*9].exclude(number);
	}
	if(!ARR[indexX+indexY*9+1].isDisplay){
		ARR[indexX+indexY*9+1].exclude(number);
	}
	if(!ARR[indexX+indexY*9+2].isDisplay){
		ARR[indexX+indexY*9+2].exclude(number);
	}
}

function _excludeNumber_line(indexX,indexY,number){//线级排除
	for(let l = 0; l<9; ++l){
		if(!ARR[indexY*9+l].isDisplay){//横向排除
			ARR[indexY*9+l].exclude(number);
		}
		if(!ARR[9*l+indexX].isDisplay){//纵向排除
			ARR[9*l+indexX].exclude(number);	
		}
	}
}

function check(){//唯一确认
	check_block();//块儿内唯一确定
	check_line();//线性唯一确定
}


function check_block(){//块儿内唯一确定
	let x = 0;
	let y = 0;
	while(y<9){
		while(x<9){
			do_block(x,y);
			x+=3;
		}
		x=0;
		y+=3;
	}
}

function do_block(_x,_y){
	let x = _x;
	let y = _y;
	let n = 0;
	let index = 0;
	let isLoop = false;
	check:for(let num =1; num<=9; ++num){
		x = _x;
		y = _y;
		while(y<_y+3){
			while(x<_x+3){
				//每一个块内9小格
				if(ARR[x+y*9].isDisplay){
					if(ARR[x+y*9].number == num){//如果已经显示此数字
						continue check;//返回检测循环
					}
				}
				++x;
			}
			x = _x;
			++y;
		}
		//检测不存在
		x = _x;
		y = _y;
		n = 0;
		index = 0;
		while(y<_y+3){
			while(x<_x+3){
				//每一个块内9小格
				if(ARR[x+y*9].isDisplay){
				}
				if(ARR[x+y*9].numberArr[num-1]){
					++n;
					index = x+y*9;
				}
				++x;
			}
			x = _x;
			++y;
		}
		if(n==1){
			isLoop = true;
			ARR[index].number=num;
			excludeNumber(index%9,Math.floor(index/9),ARR[index].number);
		}
	}
	if(isLoop){
		do_block(_x,_y);
		isLoop = false;
	}
}

function check_line(){//线性唯一确定
	for(let l = 0; l<9; ++l){
		for(let num = 1; num<=9; ++num){
			if(do_lineH(l,num)||do_lineS(l,num)){
				num = 1;
			}
		}
	}
}
//行确定
function do_lineH(_t,number){
	let n = 0;
	let index;
	for(let i = 0; i<9; ++i){
		if(ARR[_t*9+i].isDisplay){
			if(ARR[_t*9+i].number == number){
				return false;
			}
		}
	}
	for(let i = 0; i<9; ++i){
		if(!ARR[_t*9+i].isDisplay){
			if(ARR[_t*9+i].numberArr[number-1]){
				++n;
				index = _t*9+i;
			}
		}
	}
	if(n==1){
		ARR[index].number = number;
		return true;
	}
	return false;
}

//列确定
function do_lineS(_t,number){
	let n = 0;
	let index;
	for(let i = 0; i<9; ++i){
		if(ARR[_t+9*i].isDisplay){
			if(ARR[_t+9*i].number == number){
				return false;
			}
		}
	}
	for(let i = 0; i<9; ++i){
		if(!ARR[_t+9*i].isDisplay){
			if(ARR[_t+9*i].numberArr[number-1]){
				++n;
				index = _t+9*i;
			}
		}
	}
	if(n==1){
		ARR[index].number = number;
		return true;
	}
	return false;
}
