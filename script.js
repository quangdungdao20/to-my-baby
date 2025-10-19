// Gallery functionality
let currentImageIndex = 0;
const totalImages = 18;
const imageNames = [];
const audio = document.getElementById('backgroundMusic');
// Generate image names (1.jpg to 18.jpg)
for (let i = 1; i <= totalImages; i++) {
    imageNames.push(`image/${i}.jpg`);
}

// Force autoplay music immediately
function initMusic() {
    const music = document.getElementById('backgroundMusic');

    if (music) {
        // Start with muted autoplay (browsers allow this)
        // Then immediately unmute
        setTimeout(() => {
            music.muted = false;
            music.volume = 0.3;
            music.play();
        }, 100);

        // Backup: try again after a bit
        setTimeout(() => {
            if (music.paused) {
                music.muted = false;
                music.volume = 0.3;
                music.play();
            }
        }, 500);

        // Backup: try when audio is ready
        music.addEventListener('canplaythrough', () => {
            if (music.paused) {
                music.muted = false;
                music.volume = 0.3;
                music.play();
            }
        });

        // Ensure it keeps playing
        setInterval(() => {
            if (music.paused && music.readyState >= 2) {
                music.muted = false;
                music.play().catch(() => { });
            }
        }, 1000);
    }
}


// Gallery functions
function openGallery() {
    document.getElementById('galleryModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Set initial background watermark
    const backgroundWatermark = document.getElementById('backgroundWatermark');
    if (backgroundWatermark) {
        backgroundWatermark.style.backgroundImage = `url('${imageNames[currentImageIndex]}')`;
    }
}

function closeGallery() {
    document.getElementById('galleryModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    updateCurrentImageWithFade();
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    updateCurrentImageWithFade();
}

function goToImage(index) {
    currentImageIndex = index;
    updateCurrentImageWithFade();
}

function updateCurrentImageWithFade() {
    const currentImage = document.getElementById('currentImage');
    const backgroundWatermark = document.getElementById('backgroundWatermark');

    // Fade out
    currentImage.classList.add('image-fade-out');

    setTimeout(() => {
        // Change image source for both main image and background watermark
        currentImage.src = imageNames[currentImageIndex];
        if (backgroundWatermark) {
            backgroundWatermark.style.backgroundImage = `url('${imageNames[currentImageIndex]}')`;
        }

        // Fade in
        currentImage.classList.remove('image-fade-out');
        currentImage.classList.add('image-fade-in');

        // Remove fade-in class after animation
        setTimeout(() => {
            currentImage.classList.remove('image-fade-in');
        }, 500);
    }, 250);
}

// Remove unused functions
function updateCurrentImage() {
    // This function is no longer needed
}

function updateImageCounter() {
    // This function is no longer needed
}

function generateThumbnails() {
    // This function is no longer needed
}

function updateActiveThumbnail() {
    // This function is no longer needed
}

function scrollToActiveThumbnail() {
    // This function is no longer needed
}

// Keyboard navigation
document.addEventListener('keydown', function (event) {
    const modal = document.getElementById('galleryModal');
    if (!modal.classList.contains('hidden')) {
        switch (event.key) {
            case 'ArrowLeft':
                previousImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'Escape':
                closeGallery();
                break;
        }
    }
});

// Close modal when clicking outside
document.getElementById('galleryModal').addEventListener('click', function (event) {
    if (event.target === this) {
        closeGallery();
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('currentImage').addEventListener('touchstart', function (event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.getElementById('currentImage').addEventListener('touchend', function (event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextImage(); // Swipe left, go to next image
        } else {
            previousImage(); // Swipe right, go to previous image
        }
    }
}



// Text content for typing effect
const textContent = {
    title: "🌸 Chúc Mừng 20/10 🌸",
    subtitle: "Gửi đến người con gái tuyệt vời nhất",
    content: `Hôm nay là ngày 20/10 — ngày dành riêng cho những người phụ nữ tuyệt vời, và trong tất cả, em là người đặc biệt nhất với anh.

Anh chỉ muốn nói rằng: cảm ơn em vì đã bước vào cuộc đời anh, vì đã mang đến sự bình yên, ấm áp và cả những niềm vui nhỏ bé mà anh chưa từng biết trước đó.

Cuộc sống của anh không phải lúc nào cũng trọn vẹn, nhưng từ khi có em, mọi thứ trở nên dịu dàng và ý nghĩa hơn. Em là lý do khiến anh muốn cố gắng mỗi ngày — để xứng đáng với tình cảm, với niềm tin và với nụ cười của em.

Anh chúc em một ngày 20/10 thật hạnh phúc, ngập tràn tiếng cười, hoa và những điều dễ thương nhất. Chúc em luôn mạnh mẽ, luôn tỏa sáng, luôn là chính mình — người con gái thông minh, dịu dàng và ấm áp mà anh yêu.

Dù cuộc sống có bận rộn thế nào, anh vẫn muốn dành cho em một góc nhỏ trong tim — nơi chỉ có em, và chỉ thuộc về em.

💖 Yêu em, Nguyễn Thị Hường   💖`
};

// Typing effect functions
function typeWriter(element, text, speed = 900, callback = null) {
    let i = 0;
    element.classList.add('typing-cursor');

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('typing-cursor');
            if (callback) callback();
        }
    }

    element.textContent = '';
    type();
}

function startTypingSequence() {
    const titleElement = document.getElementById('typing-title');
    const subtitleElement = document.getElementById('typing-subtitle');
    const contentElement = document.getElementById('typing-content');

    // Start with title
    setTimeout(() => {
        typeWriter(titleElement, textContent.title, 100, () => {
            // Then subtitle
            setTimeout(() => {
                typeWriter(subtitleElement, textContent.subtitle, 80, () => {
                    // Finally content
                    setTimeout(() => {
                        typeWriter(contentElement, textContent.content, 30);
                    }, 500);
                });
            }, 300);
        });
    }, 1000);
}

// Magic Dust System
let animationId = 1;



// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function () {
    startTypingSequence();
    hideLoading(); // Hide loading after 1 second

    // Preload first few images for better performance
    for (let i = 0; i < Math.min(5, totalImages); i++) {
        const img = new Image();
        img.src = imageNames[i];
    }

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Initialize animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Add swipe detection for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const galleryModal = document.getElementById('galleryModal');

    galleryModal.addEventListener('touchstart', function (event) {
        touchStartX = event.changedTouches[0].screenX;
    });

    galleryModal.addEventListener('touchend', function (event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage(); // Swipe left, go to next image
            } else {
                previousImage(); // Swipe right, go to previous image
            }
        }
    }
});

// Message animation
function animateMessage() {
    const messages = [
        "Chúc em luôn xinh đẹp! 🌸",
        "Ngày 20/10 vui vẻ! 💖",
        "Em là điều tuyệt vời nhất! ✨",
        "Yêu em nhiều lắm! 💕"
    ];

    let messageIndex = 0;
    const messageElement = document.querySelector('.animate-fade-in-up-delay p');

    setInterval(() => {
        messageElement.style.opacity = '0';
        setTimeout(() => {
            messageElement.textContent = messages[messageIndex];
            messageElement.style.opacity = '1';
            messageIndex = (messageIndex + 1) % messages.length;
        }, 500);
    }, 4000);
}

// Loading functionality - Hide after 1 second
function hideLoading() {
    setTimeout(() => {
        const loadingWrapper = document.querySelector('.loading-wrapper');
        if (loadingWrapper) {
            loadingWrapper.style.opacity = '0';
            loadingWrapper.style.transition = 'opacity 0.5s ease-out';
            
            setTimeout(() => {
                loadingWrapper.style.display = 'none';
                // Start music after loading is completely hidden
                initMusic();
            }, 500);
        }
    }, 1000);
}