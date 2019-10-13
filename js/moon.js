
// 254,194,81  -> 0.1089, 0.6811, 0.9961
// 234,142,57  -> 0.08, 0.7564, 0.9176

let ctx;

function setup(){
  ctx = createCanvas(600, 600).canvas.getContext('2d');
  //应该使用的是HSB/HSV模式的颜色，只是调节亮度达到月亮的效果
}

function draw(){
  let b = 1;
  let xMult = 0.01;
  let yMult = 0.01;
  background(0);
  //绘制背景之后立刻进行绘制光晕
  push();
  colorMode(RGB);
  ctx.shadowColor = 'rgba(254,194,81,0.8)';
  ctx.shadowBlur = 35;
  fill(254,194,81);//没有填充色的话是不会存在阴影的
  noStroke();
  ellipse(width/2, height/2, height-20);
  pop();

  //进行月亮的计算
  push();
  colorMode(HSB, 1, 1, 1, 1);  
  noFill();
  noStroke();
  ctx.arc(width/2, height/2, height/2-20,0,PI*2,false);
  ctx.clip();
  for(let i = 0; i<width; ++i){
    for(let j = 0; j<height; ++j ){
      stroke(0.1089, 0.6811,constrain(map(noise(i*xMult,j*yMult),0,1,0.78,1.2), 0, 1));
      point(i, j);
    }
  }
  pop();


  noLoop();
}

