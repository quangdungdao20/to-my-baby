// Gallery functionality
let currentImageIndex = 0;
const totalImages = 18;
const imageNames = [];

// Generate image names (1.jpg to 18.jpg)
for (let i = 1; i <= totalImages; i++) {
    imageNames.push(`image/${i}.jpg`);
}

// Initialize falling hearts
function createFallingHearts() {
    const heartsContainer = document.querySelector('.falling-hearts');
    const hearts = ['💖', '💕', '💗', '💓', '💘', '🌸', '🌹', '🎀'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 5000);
    }
    
    // Create hearts periodically with lower frequency for better performance
    setInterval(createHeart, 1200);
}

// Gallery functions
function openGallery() {
    document.getElementById('galleryModal').classList.remove('hidden');
    generateThumbnails();
    updateImageCounter();
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    document.getElementById('galleryModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    updateCurrentImage();
    updateImageCounter();
    updateActiveThumbnail();
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    updateCurrentImage();
    updateImageCounter();
    updateActiveThumbnail();
}

function goToImage(index) {
    currentImageIndex = index;
    updateCurrentImage();
    updateImageCounter();
    updateActiveThumbnail();
}

function updateCurrentImage() {
    const currentImage = document.getElementById('currentImage');
    currentImage.style.opacity = '0';
    
    setTimeout(() => {
        currentImage.src = imageNames[currentImageIndex];
        currentImage.style.opacity = '1';
    }, 150);
}

function updateImageCounter() {
    document.getElementById('imageCounter').textContent = `${currentImageIndex + 1} / ${totalImages}`;
}

function generateThumbnails() {
    const thumbnailsContainer = document.getElementById('thumbnails');
    thumbnailsContainer.innerHTML = '';
    
    imageNames.forEach((imageName, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 ${index === currentImageIndex ? 'active' : ''}`;
        thumbnail.onclick = () => goToImage(index);
        
        const img = document.createElement('img');
        img.src = imageName;
        img.alt = `Thumbnail ${index + 1}`;
        img.className = 'w-full h-full object-cover';
        img.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNCQkM5Ii8+CjxwYXRoIGQ9Ik0yMCAyMEw0NCA0NE0yMCA0NEw0NCAyMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
        };
        
        thumbnail.appendChild(img);
        thumbnailsContainer.appendChild(thumbnail);
    });
}

function updateActiveThumbnail() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('galleryModal');
    if (!modal.classList.contains('hidden')) {
        switch(event.key) {
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
document.getElementById('galleryModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeGallery();
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('currentImage').addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.getElementById('currentImage').addEventListener('touchend', function(event) {
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

// Auto-play functionality (optional)
let autoPlayInterval;
let isAutoPlaying = false;

function startAutoPlay() {
    if (!isAutoPlaying) {
        isAutoPlaying = true;
        autoPlayInterval = setInterval(nextImage, 3000);
    }
}

function stopAutoPlay() {
    if (isAutoPlaying) {
        isAutoPlaying = false;
        clearInterval(autoPlayInterval);
    }
}

// Pause autoplay when user interacts
document.getElementById('galleryModal').addEventListener('mouseenter', stopAutoPlay);
document.getElementById('galleryModal').addEventListener('mouseleave', startAutoPlay);

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    createFallingHearts();
    
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