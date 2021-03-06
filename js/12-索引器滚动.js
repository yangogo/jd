changeHeader();
kill_time();
carousel();
/**
 * 
 * 需求
 * 1 页面初始化的时候，header背景透明-rgba
 * 2 随着页面往下滑动的时候，header透明度在变大（0-0.9）
 * 3 当页面下滑的高度超出了轮播图的高度之后。header透明度就固定（0.9）
 */
function changeHeader() {

	// 获取header标签
	var header = document.querySelector("header");

	// 设置header background-     rgba 
	header.style.backgroundColor = "rgba(201,21,35,0)";

	// 2 随着页面往下滑动的时候，header透明度在变大（0-0.9）

	// 最大透明度
	var maxOpa = 0.9;

	// 获取轮播图的高度
	var height = document.querySelector(".carousel").clientHeight;
	// console.log(height);

	window.onscroll = function () {

		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		// console.log(scrollTop);

		var tmpOpa = scrollTop / height;

		if (tmpOpa > maxOpa) {
			tmpOpa = maxOpa;
		}

		// 设置header标签的rgba
		header.style.backgroundColor = "rgba(201,21,35," + tmpOpa + ")";
	}
}


/**
 * 倒计时
 */
function kill_time() {

	// 总时间
	var time = 5 * 60 * 60;

	setInterval(function () {
		time--;

		// 获取小时 Math.floor()
		var hour = parseInt(time / 60 / 60);
		// console.log(hour);

		// 获取分
		var minute = parseInt(time / 60 - hour * 60);
		// console.log(minute);

		// 获取秒
		var second = time - hour * 60 * 60 - minute * 60;
		// console.log(second);


		// 设置值

		// 获取所有的时间标签 span
		var spans = document.querySelectorAll(".timer>span");
		// console.log(spans.length);

		// hour=4 04   4 => 04  4/10=0.4  14/10=1.4  4%10=4 14%10=4 
		spans[0].innerHTML = parseInt(hour / 10);
		spans[1].innerHTML = hour % 10;

		spans[3].innerHTML = parseInt(minute / 10);
		spans[4].innerHTML = minute % 10;

		spans[6].innerHTML = parseInt(second / 10);
		spans[7].innerHTML = second % 10;
	}, 1000);
}


/*
  需求：
	1 先做自动滚动
	2 做手动滑动效果
	3 索引器随着轮播变化而变化
*/
function carousel() {

	// 获取要轮播的对象
	var carousel_ul = document.querySelector('.carousel_ul');

	// 定义轮播的索引
	var index = 1;

	// 以前通过margin-left 但是在移动端 使用transform:translateX()
	// console.log("-" + index + "0%");

	carousel_ul.style.transform = "translateX(-" + index + "0%)";

	// 开启定时器
	var timeId = goInterval();

	// 索引器的索引
	var li_ind = 0;
	// 过渡结束事件
	carousel_ul.addEventListener("transitionend", function () {
		// console.log(index);
		// 判断是否到了倒数第二张(8)，把索引改为第一张(0)
		// 浏览器缩小后 判断无效 其实是 浏览器的bug 所以要 >= 

		li_ind = index - 1;
		if (index >= 8) {
			index = 0;
			li_ind = 7;
		} else if (index <= 0) {
			// 当往右滑动的时候 当到了第0张，需要瞬间切换到第8张
			index = 8;
			li_ind = 7;
		}

		// 将轮播瞬间切换位置 -不需要使用过渡效果
		carousel_ul.style.transition = "none";
		carousel_ul.style.transform = "translateX(-" + index + "0%)";

		activeLI(li_ind);
	});


	// 绑定滑动事件
	/* 
	1 清除定时器
	2 改变索引 index  改变位置
	3 重新开启定时器
	 */
	itcastEvent(carousel_ul).swipe(function (direction) {
		console.log(direction);
		// 清除定时器
		clearInterval(timeId);
		switch (direction) {
			case "left":
				index++;
				break;
			case "right":
				index--;
		}

		// console.log(index);
		// 改变轮播图的位置  
		carousel_ul.style.transition = "all .5s";
		carousel_ul.style.transform = "translateX(-" + index + "0%)";

		// 重新开启定时器
		timeId = goInterval();
	});

	// 开启定时器
	function goInterval() {
		return setInterval(function () {
			index++;
			carousel_ul.style.transition = "all .5s";
			carousel_ul.style.transform = "translateX(-" + index + "0%)";

		}, 1000);
	}

	window.onblur=function () {
		console.log("清除定时器");
		clearInterval(timeId);
	}
	window.onfocus=function () {
		console.log("重新开始定时器");
		timeId=goInterval();
	}
}

/* 
  需求：
	让索引器跟着轮播图的变化而变化
*/

function activeLI(liIndex) {

	// 获取所有的li
	var lis = document.querySelectorAll(".carousel_index>li");
	console.log(lis.length);
	for (var i = 0; i < lis.length; i++) {
		var element = lis[i];
		// 清除选中效果
		element.classList.remove("active");
	}

	// 激活当前的li标签
	lis[liIndex].classList.add("active");
}

/*
  新的类库-zepto  jquery
  	
*/