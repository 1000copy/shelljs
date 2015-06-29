var shell = require('..');
var expect =require('chai').expect
var assert = require("assert")
describe('op', function(){
  describe('aaap2', function(){
  	// 多出来的选项要提示，比如b
    it('2.1.1', function(){
    	var cmd = ("ls -xyb").split(' ')
    	var rr= require('optimist')(cmd)
		var argv = rr.
			boolean(['x','y'])
			.demand("x y".split(" "))			
			.describe('x', 'Load a file')
			.describe('y', 'Save a file')
			.argv
		;
		var j = Object.keys(argv)
		console.dir(j);
		var jj = subtract(j,["_","$0"])
		console.dir(jj);
		console.dir(argv.options);
		// console.dir(argv);
		// console.dir([ argv.x, argv.y, argv.z ]);
		// console.dir(argv._);   
	}) 
  })
  it('eeee', function(){
    	var cmd = ("ls -xyb").split(' ')
    	var rr= require('optimist')(cmd)
    	var core = rr.
			boolean(['x','y'])
			.demand("x y".split(" "))			
			.describe('x', 'Load a file')
			.describe('y', 'Save a file')
		var argv = core.argv
		;
		var j = Object.keys(argv)
		// console.dir(j);
		var jj = subtract(j,["_","$0"])
		// console.dir(jj);
		// console.dir(core._options);
		// 多出来的b，需要提示给用户
		// console.dir(subtract(jj,core._options.boolean))
		expect(subtract(jj,core._options.boolean)).to.deep.equal(["b"])
		// console.dir(argv);
		// console.dir([ argv.x, argv.y, argv.z ]);
		// console.dir(argv._);   
	}) 
  
  describe('2.1', function(){
  	// 多出来的选项要提示，比如b
    it('op1', function(){
  		var a=[1,2,3]
  		var b = [3]
  		console.log(subtract(a,b))
  	})
  })
})
//  集合运算可以用undercore来解决
function subtract(a,b){
	var r =[]
	for(var i =0;i<a.length;i++){
		if (_in(a[i] , b))
			continue
		else
			r.push(a[i])
	}
	return r
}
function _in(a,b){
	var r =[]
	for(var i =0;i<b.length;i++){
		if (b[i] == a)
			return true	
	}
	return false
}