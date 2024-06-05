document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('formContainer');
    const form = document.getElementById('formOne');
    const username = document.getElementById('username');
    const email = document.getElementById('email');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let isValid = true;
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        // Reset chybové zprávy
        removeErrorMessages();

        // Validace uživatelského jména
        if (usernameValue === '') {
            isValid = false;
            showError(username, 'Username is required.');
        }

        // Validace emailu
        if (emailValue === '') {
            isValid = false;
            showError(email, 'Email is required.');
        } else if (!emailPattern.test(emailValue)) {
            isValid = false;
            showError(email, 'Email is not valid.');
        }

        if (isValid) {
            formContainer.classList.remove('fadeIn');

            formContainer.classList.add('fadeOut');

            console.log("mažu");


            formContainer.addEventListener('animationend', function handleAnimationEnd() {
                formContainer.style.display = 'none';
                form.reset();
                formContainer.classList.remove('fadeOut');
                formContainer.removeEventListener('animationend', handleAnimationEnd);
            }, { once: true });
        }
    });

    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error';
        error.textContent = message;
        input.parentNode.insertBefore(error, input.nextSibling);
        input.classList.add('error-border');
    }

    function removeErrorMessages() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => error.remove());
        const errorBorders = document.querySelectorAll('.error-border');
        errorBorders.forEach(input => input.classList.remove('error-border'));
    }
});
