/* ============================================================
   IRON PULSE GYM — Main Script
   Handles: Navbar scroll, Hamburger toggle, Form validation,
            Join Now button → auto-select plan
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // -------------------- DOM References --------------------
    const navBar      = document.getElementById('navBar');
    const hamburger   = document.getElementById('hamburger');
    const hamIcon     = document.getElementById('hamIcon');
    const hamNav      = document.getElementById('hamNav');
    const hamLinks    = document.querySelectorAll('.hamLink');
    const navLinks    = document.querySelectorAll('.navLink');
    const joinBtns    = document.querySelectorAll('.joinBtn');
    const form        = document.getElementById('enquiryForm');
    const successMsg  = document.getElementById('successMsg');

    // -------------------- Sticky Navbar --------------------
    // Navbar is always fixed, but add a subtle background shift on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navBar.style.background = '#0a0a0a';
        } else {
            navBar.style.background = '';
        }
    });

    // -------------------- Active Nav Link on Scroll --------------------
    const sections = document.querySelectorAll('section, footer');

    const highlightNav = () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top    = section.offsetTop;
            const height = section.offsetHeight;
            const id     = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

    // -------------------- Hamburger Toggle --------------------
    let hamOpen = false;

    hamburger.addEventListener('click', () => {
        hamOpen = !hamOpen;

        if (hamOpen) {
            hamNav.classList.remove('hide');
            hamIcon.classList.remove('fa-bars');
            hamIcon.classList.add('fa-xmark');
        } else {
            hamNav.classList.add('hide');
            hamIcon.classList.remove('fa-xmark');
            hamIcon.classList.add('fa-bars');
        }
    });

    // Close mobile nav when a link is clicked
    hamLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamOpen = false;
            hamNav.classList.add('hide');
            hamIcon.classList.remove('fa-xmark');
            hamIcon.classList.add('fa-bars');
        });
    });

    // -------------------- Join Now → Pre-select Plan --------------------
    const membershipSelect = document.getElementById('membershipSelect');

    joinBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const plan = btn.getAttribute('data-plan');
            if (plan && membershipSelect) {
                // Set the select value to match the plan
                for (const option of membershipSelect.options) {
                    if (option.value === plan) {
                        option.selected = true;
                        break;
                    }
                }
            }
            // Smooth scroll is handled by the href="#enquirySec"
        });
    });

    // -------------------- Form Validation --------------------
    const firstName  = document.getElementById('firstName');
    const lastName   = document.getElementById('lastName');
    const email      = document.getElementById('email');

    const showError = (input, errorId, message) => {
        input.classList.add('invalid');
        document.getElementById(errorId).textContent = message;
    };

    const clearError = (input, errorId) => {
        input.classList.remove('invalid');
        document.getElementById(errorId).textContent = '';
    };

    // Clear errors on input
    firstName.addEventListener('input', () => clearError(firstName, 'firstNameError'));
    lastName.addEventListener('input',  () => clearError(lastName, 'lastNameError'));
    email.addEventListener('input',     () => clearError(email, 'emailError'));
    membershipSelect.addEventListener('change', () => clearError(membershipSelect, 'membershipError'));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // First name
        if (firstName.value.trim() === '') {
            showError(firstName, 'firstNameError', 'First name is required.');
            isValid = false;
        } else {
            clearError(firstName, 'firstNameError');
        }

        // Last name
        if (lastName.value.trim() === '') {
            showError(lastName, 'lastNameError', 'Last name is required.');
            isValid = false;
        } else {
            clearError(lastName, 'lastNameError');
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            showError(email, 'emailError', 'Email address is required.');
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            showError(email, 'emailError', 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearError(email, 'emailError');
        }

        // Membership select
        if (membershipSelect.value === '') {
            showError(membershipSelect, 'membershipError', 'Please select a membership plan.');
            isValid = false;
        } else {
            clearError(membershipSelect, 'membershipError');
        }

        // If valid — show success, hide form
        if (isValid) {
            form.classList.add('hide');
            successMsg.classList.remove('hide');
        }
    });
});
