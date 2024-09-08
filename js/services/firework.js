!function (window, document) {
    // 初始化函数，设置样式并启动动画
    function init() {
        // 添加CSS样式
        addStyles(`
            .spark {
                position: fixed;
                border-radius: 50%;
                pointer-events: none;
                transition: all 1s ease-out;
                z-index: 99999;
            }
        `);
        // 绑定点击事件
        bindClickEvent();
        // 启动动画
        animate();
    }

    // 添加CSS样式到页面
    function addStyles(styles) {
        var styleElement = document.createElement("style");
        styleElement.type = "text/css";
        try {
            styleElement.appendChild(document.createTextNode(styles));
        } catch (e) {
            styleElement.styleSheet.cssText = styles;
        }
        document.head.appendChild(styleElement);
    }

    // 绑定点击事件
    function bindClickEvent() {
        window.addEventListener('click', function (event) {
            createSparks(event);
        });
    }

    // 创建多个火花元素
    function createSparks(event) {
        var numberOfSparks = 30; // 火花数量
        for (var i = 0; i < numberOfSparks; i++) {
            var sparkElement = document.createElement("div");
            sparkElement.className = "spark";
            var angle = Math.random() * 2 * Math.PI; // 随机角度
            var speed = Math.random() * 150 + 50; // 随机速度
            sparks.push({
                el: sparkElement,
                x: event.clientX,
                y: event.clientY,
                dx: Math.cos(angle) * speed, // 水平速度
                dy: Math.sin(angle) * speed, // 垂直速度
                alpha: 1,
                scale: Math.random() * 1.5 + 0.5, // 随机缩放
                color: getRandomPinkColor() // 统一为粉色系颜色
            });
            document.body.appendChild(sparkElement);
        }
    }

    // 获取粉色系随机颜色
    function getRandomPinkColor() {
        var r = 255;
        var g = Math.floor(Math.random() * 156 + 100); // 绿色值在100到255之间
        var b = Math.floor(Math.random() * 255); // 蓝色值在0到255之间
        return `rgb(${r},${g},${b})`;
    }

    // 动画函数
    function animate() {
        for (var i = 0; i < sparks.length; i++) {
            var spark = sparks[i];
            if (spark.alpha <= 0) {
                document.body.removeChild(spark.el);
                sparks.splice(i, 1);
                i--;
            } else {
                spark.x += spark.dx * 0.05; // 控制水平运动速度
                spark.y += spark.dy * 0.05; // 控制垂直运动速度
                spark.alpha -= 0.02; // 增加透明度减少速度
                spark.el.style.cssText = `
                    left:${spark.x}px;
                    top:${spark.y}px;
                    opacity:${spark.alpha};
                    background:${spark.color};
                    width:${10 * spark.scale}px;
                    height:${10 * spark.scale}px;
                    z-index:99999;
                `;
            }
        }
        requestAnimationFrame(animate);
    }

    // 兼容不同浏览器的 requestAnimationFrame
    window.requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            setTimeout(callback, 1000 / 60);
        };

    var sparks = []; // 存储所有火花元素

    // 等待 DOM 加载完成后再初始化
    document.addEventListener('DOMContentLoaded', init);
}(window, document);
