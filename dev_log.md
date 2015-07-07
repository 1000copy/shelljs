### optimist 功能比较全，但是我不喜欢它的品味。在require后面加个()传递参数，+链式语法。很怪。果然在代码中看到它的hack code。

      	var rr= require('optimist')(cmd)
  		var argv = rr.
  			boolean(['x','y'])
  			.demand("x y".split(" "))			
  			.describe('x', 'Load a file')
  			.describe('y', 'Save a file')
  			.argv
  		;
