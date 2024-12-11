function dark() {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var n, e, i, h, t = 0.05,
        s = document.getElementById("universe"),
        o = true,
        a = "180,184,240", // 白天的星星颜色
        r = "226,225,142", // 夜晚的星星颜色
        d = "226,225,224", // 彗星的颜色
        c = [];

    function f() {
        n = window.innerWidth, e = window.innerHeight, i = 0.216 * n, s.setAttribute("width", n), s.setAttribute("height", e)
    }

    function u() {
        h.clearRect(0, 0, n, e);
        for (var t = c.length, i = 0; i < t; i++) {
            var s = c[i];
            s.move(), s.fadeIn(), s.fadeOut(), s.draw()
        }
    }

    function y() {
        this.reset = function () {
            this.giant = m(3), this.comet = !this.giant && !o && m(10), this.x = l(0, n - 10), this.y = l(0, e), this.r = l(1.1, 3.6), // 增大流星的大小
            this.dx = l(t, 12 * t) + (this.comet + 1 - 1) * t * l(50, 150) + 4 * t,  // 增加流星的横向速度
            this.dy = -l(t, 12 * t) - (this.comet + 1 - 1) * t * l(50, 150), // 增加流星的纵向速度
            this.fadingOut = null, this.fadingIn = true, this.opacity = 0,
            this.opacityTresh = l(0.2, 1 - 0.4 * (this.comet + 1 - 1)),
            this.do = l(5e-4, 0.004) + 0.001 * (this.comet + 1 - 1) // 增加流星出现的频率
        }, this.fadeIn = function () {
            this.fadingIn && (this.fadingIn = !(this.opacity > this.opacityTresh), this.opacity += this.do)
        }, this.fadeOut = function () {
            this.fadingOut && (this.fadingOut = !(this.opacity < 0), this.opacity -= this.do / 2, (this.x > n || this.y < 0) && (this.fadingOut = false, this.reset()))
        }, this.draw = function () {
            if (h.beginPath(), this.giant) h.fillStyle = "rgba(" + a + "," + this.opacity + ")", h.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
            else if (this.comet) {
                h.fillStyle = "rgba(" + d + "," + this.opacity + ")", h.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);
                for (var t = 0; t < 30; t++) h.fillStyle = "rgba(" + d + "," + (this.opacity - this.opacity / 20 * t) + ")", h.rect(this.x - this.dx / 4 * t, this.y - this.dy / 4 * t - 2, 2, 2), h.fill()
            } else h.fillStyle = "rgba(" + r + "," + this.opacity + ")", h.rect(this.x, this.y, this.r, this.r);
            h.closePath(), h.fill()
        }, this.move = function () {
            this.x += this.dx, this.y += this.dy, !false === this.fadingOut && this.reset(), (this.x > n - n / 4 || this.y < 0) && (this.fadingOut = true)
        }, setTimeout(function () {
            o = false
        }, 50)
    }

    function m(t) {
        return Math.floor(1e3 * Math.random()) + 1 < 10 * t
    }

    function l(t, i) {
        return Math.random() * (i - t) + t
    }

    f(), window.addEventListener("resize", f, false),
        function () {
            h = s.getContext("2d");
            for (var t = 0; t < i; t++) c[t] = new y, c[t].reset();
            u()
        }(),

        // 动态监听主题变化
        function t() {
            var currentTheme = document.getElementsByTagName('html')[0].getAttribute('data-theme');

            // 在 dark 或 light 主题下都绘制星空
            if (currentTheme === 'dark' || currentTheme === 'light') {
                u();
            }
            window.requestAnimationFrame(t);
        }();
};

dark();
