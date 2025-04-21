// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if(this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            
            // Here you would normally send to a server
            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                alert('Thank you! Your message has been sent.');
                this.reset();
            })
            .catch(error => {
                alert('There was an error. Please try again later.');
                console.error(error);
            });
        });
    }

    // Animate sections on scroll
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.style.animation = 'fadeIn 0.8s ease-out forwards';
            }
        });
    };

    // Initialize animations
    window.addEventListener('load', () => {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.opacity = '0';
        });
        
        animateOnScroll();
    });

    window.addEventListener('scroll', animateOnScroll);
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// PDF Viewer Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize PDF.js
    pdfjsLib.GlobalWorkerOptions.workerSrc = 
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
  
    // Load the PDF
    const loadingTask = pdfjsLib.getDocument('assets/SwatiKushwaha Resume.pdf');
    
    loadingTask.promise.then(function(pdf) {
      // Fetch the first page
      return pdf.getPage(1).then(function(page) {
        const scale = 1.5;
        const viewport = page.getViewport({ scale: scale });
  
        // Prepare canvas
        const canvas = document.getElementById('pdf-canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
  
        // Render PDF page into canvas context
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        
        return page.render(renderContext).promise;
      });
    }).catch(function(error) {
      console.error('PDF loading error:', error);
      // Fallback to download button only
      document.getElementById('pdf-viewer-container').innerHTML = `
        <div class="pdf-fallback">
          <p>Unable to display PDF preview.</p>
          <a href="assets/SwatiKushwaha Resume.pdf" class="btn" target="_blank">
            <i class="fas fa-external-link-alt"></i> Open PDF
          </a>
          <a href="assets/SwatiKushwaha Resume.pdf" download class="btn download-btn">
            <i class="fas fa-download"></i> Download PDF
          </a>
        </div>
      `;
    });
  });
