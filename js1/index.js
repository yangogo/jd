
    onload = function () {
        headerdown();
        timedown();
        // header  改变透明色
        function headerdown() {
             //获取元素
            var header = document.querySelector("header");
            //获取轮播图的高度
            var sliderH = document.querySelector(".slider img").offsetHeight;
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            if (scrollTop > sliderH){
                header.style.backgroundColor = "rgba(201, 21, 35,.9)";
            }
            onscroll = function () {
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                var colora = scrollTop / sliderH;
                if ( colora >= 0.9){
                    colora = 0.9
                }
                header.style.backgroundColor = "rgba(201, 21, 35," + colora + ")";
            }
        }
        // 倒计时 函数
        function timedown() {
            var spans = document.querySelectorAll(".down_time>span");
            var time = 5*60*60;
            timefn();
            var timeId = setInterval(function(){
                time--;
                timefn(); 
                if ( time == 0 ){
                    clearInterval(timeId);
                    console.log( '抢购完成' );
                }  
            },1000);
            function timefn() {
                var hour = parseInt(time/60/60);
                var minute = parseInt(time/60-hour*60);
                var second = parseInt(time-hour*60*60-minute*60);
                var hour1 = parseInt(hour/10);
                var hour2 = hour%10;
                var minute1 = parseInt(minute/10);
                var minute2 = minute%10;
                var second1 = parseInt(second/10);
                var second2 = second%10;
                // console.log( hour1,hour2,minute1,minute2,second1,second2 );
                spans[0].innerText = hour1;
                spans[1].innerText = hour2;
                spans[3].innerText = minute1;
                spans[4].innerText = minute2;
                spans[6].innerText = second1;
                spans[7].innerText = second2;
            }
     
        }

        //轮播图
        var ul = document.querySelector(".slider_ul");
        var index = 1;
        ul.style.transform = "translateX(-" + index + "0%)";
        //自动轮播
        var time = inteve();
        ul.addEventListener('transitionend', function () {
            if (index >= 9) {
                index = 1;
                ul.style.transition = " none";
                ul.style.transform = "translateX(-" + index + "0%)";
            }
            if (index <= 0) {
                index = 8;
                ul.style.transition = " none";
                ul.style.transform = "translateX(-" + index + "0%)";
            }
        });
    
        //轻划轮播
        itcast(ul).swipe(function (d) {
            console.log(d);
            clearInterval(time);
            if (d == "right") {
                index--
            }
            if (d == "left") {
                index++
            }
            ul.style.transition = " 0.5s";
            ul.style.transform = "translateX(-" + index + "0%)";
            time = inteve();
        })
        //定时器函数 
        function inteve() {
            return setInterval(function () {
                index++;
                ul.style.transition = " 0.5s";
                ul.style.transform = "translateX(-" + index + "0%)";
            }, 1000)
        }

        
       
    }  