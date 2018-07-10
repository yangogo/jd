 function itcast(dom) {
   var obj = {
     tap: function (callback) {
       // 按下的时间
       var startTime;
       // 开始的坐标
       var startX, startY;
       //  touchstart事件
       dom.addEventListener("touchstart", function (e) {
         // 1 判断手指的个数
         if (e.touches.length > 1) {
           return;
         }

         // 2 记录按下的时间 返回的是1970 1 1 到现在的时间戳 毫秒
         startTime = Date.now();
         // console.log(startTime);

         // 3 记录开始的坐标
         startX = e.touches[0].clientX;
         startY = e.touches[0].clientY;

         // console.log(startX, startY);
       })

       // touchend 离开
       dom.addEventListener("touchend", function (e) {
         // 1 判断手指的个数
         if (e.changedTouches.length > 1) {
           return;
         }

         // 2 计算结束的时间
         var endTime = Date.now();

         if (endTime - startTime > 200) {
           return;
         }

         // 3 计算距离
         var endX = e.changedTouches[0].clientX;
         var endY = e.changedTouches[0].clientY;

         if (Math.abs(endX - startX) > 5 || Math.abs(endY - startY) > 5) {
           return;
         }


         // 执行自己的tap的逻辑
         // alert("你好tap");
         // callback();
         callback && callback();
       })

     },
     swipe: function (callback) {

       // 开始的时间
       var startTime;
       // 开始的坐标
       var startX, startY;
       // 按下
       dom.addEventListener("touchstart", function (e) {
         // 1 判断手指的个数
         if (e.touches.length > 1) {
           return;
         }

         // 2 记录按下的时间
         startTime = Date.now();

         // 3 记录按下的坐标
         startX = e.touches[0].clientX;
         startY = e.touches[0].clientY;
       })

       // 离开
       dom.addEventListener("touchend", function (e) {
         // 1 判断手指的个数
         if (e.changedTouches.length > 1) {
           return;
         }

         // 2 计算时间
         var endTime = Date.now();
         if (endTime - startTime > 800) {
           return;
         }

         // 3 计算距离和方向 
         // 3.1 先判断水平方向上的
         var direction;
         var endX = e.changedTouches[0].clientX;
         var endY = e.changedTouches[0].clientY;

         if (Math.abs(endX - startX) > 5) {
           // 3.2 计算方向
           direction = endX > startX ? "right" : "left";
         } else if (Math.abs(endY - startY) > 5) {
           // 判断垂直方向上发生了移动
           direction = endY > startY ? "down" : "up";
         } else {
           // 既没有在水平上移动也没有在垂直上移动!!!
           return;
         }

         // 触发自己的逻辑
         // console.log(direction);
         callback && callback(direction);
       })

     }
   };
   return obj;

 }