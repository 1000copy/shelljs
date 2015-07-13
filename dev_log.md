
### Node Captain 一个在browser内执行本地命令的web server。node.js 写就，可以跨平台，可以拷贝剪贴

####资源1：有人用node实现了unix的一堆命令。就是说，是跨平台的bash。那么，它可能做我的cmd-back吗？

javascript - Command line interpreter for Windows using node.js - Stack Overflow - http://stackoverflow.com/questions/9863272/command-line-interpreter-for-windows-using-node-js?rq=1

####如何parse 一个bat？可能用得上的技术。

batch file - How does the Windows Command Interpreter (CMD.EXE) parse scripts? - Stack Overflow - http://stackoverflow.com/questions/4094699/how-does-the-windows-command-interpreter-cmd-exe-parse-scripts?rq=1



### nodemon app.js 可以自动重启app.js 当被修改的使用，很好用

要是mocha呢？

    nodemon %appdata%\npm\node_modules\mocha\bin\mocha --watch test --watch src

默认监视当前目录（不递归）。要多监视的话，需要用--watch 


### optimist 功能比较全，但是我不喜欢它的品味。在require后面加个()传递参数，+链式语法。很怪。果然在代码中看到它的hack code。

      	var rr= require('optimist')(cmd)
  		var argv = rr.
  			boolean(['x','y'])
  			.demand("x y".split(" "))			
  			.describe('x', 'Load a file')
  			.describe('y', 'Save a file')
  			.argv
  		;
