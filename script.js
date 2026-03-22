const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const clickSound = document.getElementById('clickSound');
const playButton = document.getElementById('playButton');
const videoPlaceholder = document.getElementById('videoPlaceholder');
const videoWrapper = document.getElementById('videoWrapper');
const youtubeVideo = document.getElementById('youtubeVideo');

let videoStarted = false;

const videoUrl = 'https://www.youtube.com/embed/BLMcKDqhUvk?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&volume=100';

function createLines() {
    const bg = document.getElementById('bg');
    const count = isMobile ? 2 : 6;
    for (let i = 0; i < count; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.left = Math.random() * 100 + 'vw';
        line.style.animationDuration = (Math.random() * 4 + 5) + 's';
        bg.appendChild(line);
        setTimeout(() => line.remove(), 9000);
    }
}

setInterval(createLines, isMobile ? 3000 : 1500);

if (playButton) {
    playButton.addEventListener('click', function() {
        if (!videoStarted) {
            youtubeVideo.src = videoUrl;
            videoPlaceholder.style.display = 'none';
            videoWrapper.style.display = 'block';
            videoStarted = true;
            
            setTimeout(() => {
                try {
                    if (youtubeVideo.contentWindow) {
                        youtubeVideo.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[100]}', '*');
                    }
                } catch(e) {}
            }, 1000);
        }
    });
}

document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.classList.contains('loading')) return;
        clickSound.currentTime = 0;
        clickSound.play();
        this.classList.add('loading');
        const fileName = this.dataset.file;
        const textBtn = this.querySelector('.btn-text');
        textBtn.textContent = "Скачивание...";
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = fileName;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            textBtn.textContent = "Скачать";
            this.classList.remove('loading');
        }, 2000);
    });
});