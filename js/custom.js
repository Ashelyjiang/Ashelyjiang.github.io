document.addEventListener('pjax:complete', function () {
    if (typeof APlayer !== 'undefined') {
        const ap = new APlayer({
            container: document.querySelector('.aplayer'),
            fixed: true,
            autoplay: true,
            mutex: true,
            lrcType: 0
        });
        ap.init();
    }
});

