
'use strict';

// class A {
// 	constructor() {}

// 	a() {}
// }

// class B extends A {

// }

var A = function() {};

A.prototype.a = function(arg) {
	console.log('a:' + arg);
};

A.prototype.b = function(arg) {
	console.log('b:' + arg);
};

var B = function() {};

B.prototype = Object.assign({
	a: function() {
		return "E";
	}
}, A.prototype);

B.prototype.b = function (arg) {
	console.log('b....:' + arg);
}

B.prototype.d = function(arg) {
	console.log('d:' + arg);
};

var a = new A();
var b = new B();

a.a('A');
a.b('A');

b.a('B');
b.b('B');
// b.c('B');
b.d('B');

console.log(b.a('G'));

