const isMobile = /Mobi|Android/i.test(navigator.userAgent);

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

document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.classList.contains('loading')) return;

        this.classList.add('loading');
        const fileName = this.dataset.file;
        const text = this.querySelector('.btn-text');
        text.textContent = "Скачивание...";

        setTimeout(() => {
            const link = document.createElement('a');
            link.href = fileName;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            text.textContent = "Скачать";
            this.classList.remove('loading');
        }, 2000);
    });
});