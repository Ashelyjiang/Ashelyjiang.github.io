document.addEventListener('pjax:complete', function () {
    // 确保页面切换后播放器状态保持不变
    if (window.aplayerInstance) {
        window.aplayerInstance.play();
    }
});
