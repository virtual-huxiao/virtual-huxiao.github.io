let BROKEN_COLOR_ARR = ['red','yellow'];

class Broken{
	
	constructor(_a,_b,_c,_d,_center,_color) {
		this.a = _a;
		this.b = _b;
		this.c = _c;
		this.d = _d;
		this.center = _center;
		this.color = _color;
		this.x = 0;
		this.y = 0;
		this.dist_center = dist(this.x,this.y,this.center.x,this.center.y)/mag(this.center.x,this.center.y);
		this.v = createVector(this.a.x-this.center.x,this.a.y-this.center.y).normalize();
		this.multiple = norm(dist(this.a.x,this.a.y,this.center.x,this.center.y),0,mag(width,height))*10;
		this.finish = false;
		this.rotation = 0;
		this.rotation_add = random(0.001,0.1)*random([1,-1]);
		this.sumX = this.a.x + this.b.x + this.c.x + this.d.x;
		this.sumY = this.a.y + this.b.y + this.c.y + this.d.y;
		this.avgX = this.sumX/4;
		this.avgY = this.sumY/4;
	}
	
	display(){
		push();
		fill(this.color);
		translate(this.x+this.avgX,this.y+this.avgY);
		rotate(this.rotation);
		beginShape();
		vertex(this.a.x-this.avgX,this.a.y-this.avgY);
		vertex(this.b.x-this.avgX,this.b.y-this.avgY);
		vertex(this.c.x-this.avgX,this.c.y-this.avgY);
		vertex(this.d.x-this.avgX,this.d.y-this.avgY);
		endShape(CLOSE);
		pop();
	}
	
	check(){
		if(mag(this.x,this.y)>=mag(width,height)){
			this.finish=true;
		}
		this.x += this.v.x*this.multiple;
		this.y += this.v.y*this.multiple;
		this.multiple += 1.8;
		this.rotation += this.rotation_add;
		this.dist_center = dist(this.x,this.y,this.center.x,this.center.y)/mag(this.center.x,this.center.y);
	}
	
	displayThenCheck(){
		this.display();
		this.check();
	}
}

function createDebris(leve,center,color,arr,
a={x:0,y:0},b={x:width,y:0},c={x:width,y:height},d={x:0,y:height}){
	let r1 = random(0.1,0.9);
	let r2 = random(0.1,0.9);
	let p1 = {x : a.x+(b.x-a.x)*r1 , y : a.y+(b.y-a.y)*r1};
	let p2 = {x : d.x+(c.x-d.x)*r2 , y : d.y+(c.y-d.y)*r2};
	--leve;
	if(leve>0){
		createDebris(leve,center,color,arr,p1,p2,d,a);
		createDebris(leve,center,color,arr,b,c,p2,p1);
	}else{
		arr.unshift(new Broken(a,b,c,d,center,color));
	}
}