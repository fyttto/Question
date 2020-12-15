//该题意思是变量a应该等于什么值 可以让条件成立
var a = ?; 
if (a == 1 && a == 2 && a == 3) {
    console.log(1);
}

//这道题相对来说是比较简单的，但是我们乍一看会被蒙住。这怎么能让a既等于1又等于2，还等于c。啊啊啊啊，冷静下来。
//我们仔细一想，a==一个数值，那么我们要从全局变量读取这个值，那么问题就很简单了，只要在读取数据的时候设置一个数据拦截就行。

//解法1：对象数据劫持
var i=0;//设置一个其他变量
Object.defineProperty(window,'a',{    //注意这里需要判断环境的问题，如果是浏览器环境，就是window；如是node环境，就是global
  get:function(){
  return ++i;
  }   
});
if(a==1 && a==2 && a==3){
  console.log(1);   // 1
}

//解法2：对象==字符串的时候，会调用对象的toString方法将其转换为字符串，我们可以自己定义一个toString方法。
var a = {
    i: 1,
    toString: function() {    
        return this.i++;      //  每次比较的时候都会调用toSting方法使得i++;
    }
}
if (a == 1 && a == 2 && a == 3) {
    console.log(1);
}
//解法3:数组推进法，将我们可能使用的值放进数组中，每次使用过后弹出一个元素，但需要重新定义toString方法。
var a = {
    i: 1,
    toString: function() {
        return this.i++;
    }
}
if (a == 1 && a == 2 && a == 3) {
    console.log(1);
}
