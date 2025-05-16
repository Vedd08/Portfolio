 // Typing effect for hero section
        const heroTitle = document.querySelector('.hero-title');
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        function typeEffect(element, text, i = 0, speed = 100) {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(() => typeEffect(element, text, i, speed), speed);
            }
        }
        
        // Start typing animation when page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                typeEffect(heroTitle, originalText, 0, 70);
            }, 500);
        });
        
        // Dynamic theme color switcher
        const root = document.documentElement;
        const colors = [
            { primary: '#64ffda', bg: '#0a192f', text: '#ccd6f6', secondary: '#8892b0' },
            { primary: '#F9A826', bg: '#161616', text: '#f0f0f0', secondary: '#a0a0a0' },
            { primary: '#FF6B6B', bg: '#1E1E2E', text: '#FFFFFF', secondary: '#D7DAE5' },
            { primary: '#6B66FF', bg: '#0F0F1A', text: '#E4E4FF', secondary: '#9999C2' }
        ];
        
        let currentColorIndex = 0;
        
        function changeTheme() {
            currentColorIndex = (currentColorIndex + 1) % colors.length;
            const newColors = colors[currentColorIndex];
            
            root.style.setProperty('--primary-color', newColors.primary);
            root.style.setProperty('--bg-color', newColors.bg);
            root.style.setProperty('--text-color', newColors.text);
            root.style.setProperty('--secondary-text', newColors.secondary);
            
            // Save preference in localStorage
            localStorage.setItem('themeIndex', currentColorIndex);
        }
        
        // Add theme switcher button
        const themeBtn = document.createElement('button');
        themeBtn.innerHTML = '🎨';
        themeBtn.classList.add('theme-btn');
        themeBtn.addEventListener('click', changeTheme);
        document.body.appendChild(themeBtn);
        
        // Apply theme from localStorage if exists
        if (localStorage.getItem('themeIndex')) {
            currentColorIndex = parseInt(localStorage.getItem('themeIndex'));
            const savedColors = colors[currentColorIndex];
            root.style.setProperty('--primary-color', savedColors.primary);
            root.style.setProperty('--bg-color', savedColors.bg);
            root.style.setProperty('--text-color', savedColors.text);
            root.style.setProperty('--secondary-text', savedColors.secondary);
        }
        
        // Skill progress animation
        const skills = [
            { name: 'HTML/CSS', level: 90 },
            { name: 'JavaScript', level: 85 },
            { name: 'React', level: 80 },
            { name: 'Node.js', level: 75 },
            { name: 'MongoDB', level: 70 }
        ];
        
        const skillsContainer = document.createElement('div');
        skillsContainer.classList.add('skills-container');
        
        skills.forEach(skill => {
            const skillBar = document.createElement('div');
            skillBar.classList.add('skill-bar');
            
            const skillInfo = document.createElement('div');
            skillInfo.classList.add('skill-info');
            
            const skillName = document.createElement('span');
            skillName.textContent = skill.name;
            
            const skillLevel = document.createElement('span');
            skillLevel.textContent = skill.level + '%';
            
            skillInfo.appendChild(skillName);
            skillInfo.appendChild(skillLevel);
            
            const skillProgress = document.createElement('div');
            skillProgress.classList.add('skill-progress');
            
            const skillFill = document.createElement('div');
            skillFill.classList.add('skill-fill');
            skillFill.style.width = '0%';
            
            skillProgress.appendChild(skillFill);
            skillBar.appendChild(skillInfo);
            skillBar.appendChild(skillProgress);
            skillsContainer.appendChild(skillBar);
        });
        
        const aboutSection = document.querySelector('.about-text');
        aboutSection.appendChild(skillsContainer);
        
        // Animate skill bars on scroll
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillFills = entry.target.querySelectorAll('.skill-fill');
                    skillFills.forEach((fill, index) => {
                        setTimeout(() => {
                            fill.style.width = skills[index].level + '%';
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        skillObserver.observe(skillsContainer);
        
        // Interactive project cards
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px)';
                card.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });
        });
        
        // Dynamic particle background
        const canvas = document.createElement('canvas');
        canvas.id = 'particles-canvas';
        document.body.prepend(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 50;
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width || this.x < 0) {
                    this.speedX = -this.speedX;
                }
                
                if (this.y > canvas.height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
            }
            
            draw() {
                ctx.fillStyle = 'rgba(100, 255, 218, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        function initParticles() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(100, 255, 218, ' + (1 - distance/100) + ')';
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
            
            requestAnimationFrame(animateParticles);
        }
        
        initParticles();
        animateParticles();
        
        // Mobile menu toggle
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '☰';
        
        const navLinks = document.querySelector('.nav-links');
        const navContainer = document.querySelector('nav');
        
        navContainer.appendChild(mobileMenuBtn);
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show-mobile-menu');
        });
        
        // Smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu after clicking a link
                    if (navLinks.classList.contains('show-mobile-menu')) {
                        navLinks.classList.remove('show-mobile-menu');
                    }
                }
            });
        });

        // Add active class to nav links on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });

        // Animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.project-card, .about-content, .contact-details').forEach(element => {
            observer.observe(element);
        });