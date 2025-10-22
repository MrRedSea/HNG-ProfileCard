//Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const navLinksContainer = document.querySelector('.nav-links');

    // Navigation click handler
    if (navLinks.length) {
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const pageId = this.getAttribute('data-page');
                const targetPage = pageId ? document.getElementById(`${pageId}-page`) : null;

                // If there is a matching in-page section, do SPA-style switch; otherwise allow normal navigation.
                if (targetPage) {
                    e.preventDefault();

                    // Update active nav link
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');

                    // Show selected page
                    pages.forEach(page => {
                        page.classList.remove('active');
                    });
                    targetPage.classList.add('active');
                    targetPage.scrollTop = 0;

                    // Close mobile menu if open
                    if (navLinksContainer) navLinksContainer.classList.remove('show');
                    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
                // else: let the browser follow the href to another HTML page
            });
        });
    }

    // Mobile menu toggle
    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', (!isExpanded).toString());
            navLinksContainer.classList.toggle('show');
        });
    }

    /* //update UTC time every second
    function updateUTCTime() {
        const timeElement = document.querySelector('[data-testid="currentTimeUTC"]');
        const now = new Date();
        timeElement.textContent = now.toUTCString();
    }

    updateUTCTime();
    setInterval(updateUTCTime, 1000);*/

    // update UTC time every second but show GMT+1
    function updateUTCTime() {
        const timeElement = document.querySelector('[data-testid="currentTimeUTC"]');
        if (!timeElement) return;

        const now = new Date();

        // Use a zone that is UTC+1 (Africa/Lagos does not observe DST)
        const fmt = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Africa/Lagos',
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        timeElement.textContent = `${fmt.format(now)} (GMT+1)`;
    }

    updateUTCTime();
    setInterval(updateUTCTime, 1000);

    // Avatar upload functionality
    const uploadBtn = document.getElementById('upload-btn');
    const avatarInput = document.getElementById('avatar-upload');

    if (uploadBtn && avatarInput) {
        uploadBtn.addEventListener('click', function () {
            avatarInput.click();
        });

        avatarInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const avatar = document.querySelector('[data-testid="test-user-avatar"]');
                    if (avatar) {
                        avatar.src = event.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Contact form validation & submission (client-side)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const subjectInput = document.getElementById('contact-subject');
        const messageInput = document.getElementById('contact-message');
        const successMessage = document.querySelector('[data-testid="test-contact-success"]');

        function showError(input, errorEl, message) {
            if (errorEl) {
                errorEl.textContent = message;
                errorEl.classList.add('active');
            }
            if (input) input.classList.add('error');
        }

        function clearError(input, errorEl) {
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.classList.remove('active');
            }
            if (input) input.classList.remove('error');
        }

        function validateName() {
            const value = (nameInput?.value || '').trim();
            const errorElement = document.getElementById('name-error');
            if (value === '') {
                showError(nameInput, errorElement, 'Please enter your full name');
                return false;
            }
            clearError(nameInput, errorElement);
            return true;
        }

        function validateEmail() {
            const value = (emailInput?.value || '').trim();
            const errorElement = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value === '') {
                showError(emailInput, errorElement, 'Please enter your email address');
                return false;
            } else if (!emailRegex.test(value)) {
                showError(emailInput, errorElement, 'Please enter a valid email address');
                return false;
            }
            clearError(emailInput, errorElement);
            return true;
        }

        function validateSubject() {
            const value = (subjectInput?.value || '').trim();
            const errorElement = document.getElementById('subject-error');
            if (value === '') {
                showError(subjectInput, errorElement, 'Please add a subject');
                return false;
            }
            clearError(subjectInput, errorElement);
            return true;
        }

        function validateMessage() {
            const value = (messageInput?.value || '').trim();
            const errorElement = document.getElementById('message-error');
            if (value.length < 10) {
                showError(messageInput, errorElement, 'Please enter a message of at least 10 characters');
                return false;
            }
            clearError(messageInput, errorElement);
            return true;
        }

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const ok = [validateName(), validateEmail(), validateSubject(), validateMessage()].every(Boolean);
            if (!ok) return;

            if (successMessage) {
                successMessage.textContent = 'Message sent successfully!';
                successMessage.classList.add('active');
            }
            contactForm.reset();

            setTimeout(() => {
                if (successMessage) {
                    successMessage.classList.remove('active');
                    successMessage.textContent = '';
                }
            }, 4000);
        });

        nameInput?.addEventListener('input', validateName);
        emailInput?.addEventListener('input', validateEmail);
        subjectInput?.addEventListener('input', validateSubject);
        messageInput?.addEventListener('input', validateMessage);
    }
});




