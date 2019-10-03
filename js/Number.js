class Number{
	constructor(x,y) {
	    Object.assign(this,{x,y});
			this.isDisplay = false;
			this._number = 0;	//0表示不显示
			this.numberArr = Array.apply(null, Array(9)).map(() => true);
	}
	
	get number(){
		return this._number;
	}
	
	set number(value){
		value = value<0?0:value;
		this._number = value%10;
		if(this._number!=0){//确定唯一的数值，其余数值为false
			this._arrReset(false,this._number-1,true);
			this.isDisplay = true;
		}else{//this._number==0  所有数值为可能
			this.isDisplay = false;
			this._arrReset(true);
		}
	}
	
	_arrReset(set,i,value){//总体设置为set之后个体i设置为value
		for(let x in this.numberArr){
			this.numberArr[x] = set;
		}
		if(value){
			this.numberArr[i] = value;
		}
	}
	
	exclude(value){//除去值，需要转化为索引
		this.numberArr[value-1] = false;
		let index;
		let n = 0;
		for(let v in this.numberArr){
			if(this.numberArr[v]){
				++n;
				index = Number.parseInt?Number.parseInt(v):parseInt(v);
			}
		}
		if(n == 1){//出现唯一解即为答案
			this.number = (index+1);	//索引转化为值
		}
		if(n==0) throw "无解";
	}
}