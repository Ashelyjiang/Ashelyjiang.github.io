if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    // 移动端不显示
} else {
    window && (() => {
        let e = {
            flakeCount: 70, // 增加雪花数目
            minDist: 150,    // 最小距离
            color: "255, 255, 255", // 雪花颜色
            size: 0.5,  // 雪花大小变小
            speed: 0.2,  // 雪花速度变慢
            opacity: 0.8,    // 雪花透明度
            stepsize: 0.2    // 步距
        };
        const t = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
            window.setTimeout(e, 1e3 / 60)
        };
        window.requestAnimationFrame = t;
        const i = document.getElementById("snow"),
            n = i.getContext("2d"),
            o = e.flakeCount;
        let a = -100,
            d = -100,
            s = [];
        i.width = window.innerWidth,
            i.height = window.innerHeight;
        const h = () => {
            n.clearRect(0, 0, i.width, i.height);
            const r = e.minDist;
            for (let t = 0; t < o; t++) {
                let o = s[t];
                const h = a,
                    w = d,
                    m = o.x,
                    c = o.y,
                    p = Math.sqrt((h - m) * (h - m) + (w - c) * (w - c));
                if (p < r) {
                    const e = (h - m) / p,
                        t = (w - c) / p,
                        i = r / (p * p) / 2;
                    o.velX -= i * e,
                        o.velY -= i * t
                } else
                    o.velX *= .98,
                        o.velY < o.speed && o.speed - o.velY > .01 && (o.velY += .01 * (o.speed - o.velY)),
                        o.velX += Math.cos(o.step += .05) * o.stepSize;
                n.fillStyle = "rgba(" + e.color + ", " + o.opacity + ")",
                    o.y += o.velY,
                    o.x += o.velX,
                    (o.y >= i.height || o.y <= 0) && l(o),
                    (o.x >= i.width || o.x <= 0) && l(o),
                    n.beginPath(),
                    n.arc(o.x, o.y, o.size, 0, 2 * Math.PI),
                    n.fill()
            }
            t(h)
        }
        , l = e => {
            e.x = Math.floor(Math.random() * i.width),
                e.y = 0,
                e.size = 1.5 * Math.random() + 0.5, // 增加雪花的细小感
                e.speed = 0.5 * Math.random() + 0.2, // 降低速度
                e.velY = e.speed,
                e.velX = 0,
                e.opacity = 0.5 * Math.random() + 0.3
        };
        document.addEventListener("mousemove", (e => {
            a = e.clientX,
                d = e.clientY
        }));
        window.addEventListener("resize", (() => {
            i.width = window.innerWidth,
                i.height = window.innerHeight
        }));
        (() => {
            for (let t = 0; t < o; t++) {
                const t = Math.floor(Math.random() * i.width),
                    n = Math.floor(Math.random() * i.height),
                    o = 1.5 * Math.random() + e.size, // 雪花大小
                    a = 0.5 * Math.random() + e.speed, // 雪花速度
                    d = 0.5 * Math.random() + e.opacity; // 雪花透明度
                s.push({
                    speed: a,
                    velX: 0,
                    velY: a,
                    x: t,
                    y: n,
                    size: o,
                    stepSize: Math.random() / 30 * e.stepsize,
                    step: 0,
                    angle: 180,
                    opacity: d
                })
            }
            h()
        })()
    })();
}
