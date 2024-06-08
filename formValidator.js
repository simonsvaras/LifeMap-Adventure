document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('formContainer');
    const formContainerTwo = document.getElementById('formContainerTwo');
    const formContainerThree = document.getElementById('formContainerThree');
    const complexContainer = document.getElementById('formContainerFour')

    const form = document.getElementById('formOne');
    const form2 = document.getElementById('formTwo');
    const form3 = document.getElementById('formThree');
    const form4 = document.getElementById('complexForm');
    const username = document.getElementById('username1');
    const email = document.getElementById('email1');
    const username2 = document.getElementById('username2');
    const email2 = document.getElementById('email2');
    const username3 = document.getElementById('username3');
    const email3 = document.getElementById('email3');

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

    form2.addEventListener('submit', (event) => {
        event.preventDefault();

        let isValid = true;
        const usernameValue = username2.value.trim();
        const emailValue = email2.value.trim();
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        // Reset chybové zprávy
        removeErrorMessages();

        // Validace uživatelského jména
        if (usernameValue === '') {
            isValid = false;
            showError(username2, 'Username is required.');
        }

        // Validace emailu
        if (emailValue === '') {
            isValid = false;
            showError(email2, 'Email is required.');
        } else if (!emailPattern.test(emailValue)) {
            isValid = false;
            showError(email2, 'Email is not valid.');
        }

        if (isValid) {
            formContainerTwo.classList.remove('fadeIn');

            formContainerTwo.classList.add('fadeOut');

            console.log("mažu");


            formContainerTwo.addEventListener('animationend', function handleAnimationEnd() {
                formContainerTwo.style.display = 'none';
                form2.reset();
                formContainerTwo.classList.remove('fadeOut');
                formContainerTwo.removeEventListener('animationend', handleAnimationEnd);
            }, { once: true });
        }
    });

    form3.addEventListener('submit', (event) => {
        event.preventDefault();

        let isValid = true;
        const usernameValue = username3.value.trim();
        const emailValue = email3.value.trim();
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        // Reset chybové zprávy
        removeErrorMessages();

        // Validace uživatelského jména
        if (usernameValue === '') {
            isValid = false;
            showError(username3, 'Username is required.');
        }

        // Validace emailu
        if (emailValue === '') {
            isValid = false;
            showError(email3, 'Email is required.');
        } else if (!emailPattern.test(emailValue)) {
            isValid = false;
            showError(email3, 'Email is not valid.');
        }

        if (isValid) {
            formContainerThree.classList.remove('fadeIn');

            formContainerThree.classList.add('fadeOut');

            console.log("mažu");


            formContainerThree.addEventListener('animationend', function handleAnimationEnd() {
                formContainerThree.style.display = 'none';
                form3.reset();
                formContainerThree.classList.remove('fadeOut');
                formContainerThree.removeEventListener('animationend', handleAnimationEnd);
            }, { once: true });
        }
    });



    complexContainer.addEventListener('submit', function(event) {
        event.preventDefault();

        let isValid = true;

        const name = document.getElementById('name4').value.trim();
        const email = document.getElementById('email4').value.trim();
        const password = document.getElementById('password4').value;
        const confirmPassword = document.getElementById('confirmPassword4').value;
        const age = document.getElementById('age4').value;
        const bio = document.getElementById('bio4').value.trim();
        const gender = document.getElementById('gender4').value;

        // Name validation
        if (name === '') {
            isValid = false;
            document.getElementById('nameError').textContent = 'Name is required.';
        } else {
            document.getElementById('nameError').textContent = '';
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '' || !emailPattern.test(email)) {
            isValid = false;
            document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        } else {
            document.getElementById('emailError').textContent = '';
        }

        // Password validation
        if (password.length < 8) {
            isValid = false;
            document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long.';
        } else {
            document.getElementById('passwordError').textContent = '';
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            isValid = false;
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
        } else {
            document.getElementById('confirmPasswordError').textContent = '';
        }

        // Age validation
        if (age < 18 || age > 100 || isNaN(age)) {
            isValid = false;
            document.getElementById('ageError').textContent = 'Age must be between 18 and 100.';
        } else {
            document.getElementById('ageError').textContent = '';
        }

        // Bio validation
        if (bio === '') {
            isValid = false;
            document.getElementById('bioError').textContent = 'Biography is required.';
        } else {
            document.getElementById('bioError').textContent = '';
        }

        // Gender validation
        if (gender === '') {
            isValid = false;
            document.getElementById('genderError').textContent = 'Please select your gender.';
        } else {
            document.getElementById('genderError').textContent = '';
        }

        if (isValid) {
            if (isValid) {
                complexContainer.classList.remove('fadeIn');

                complexContainer.classList.add('fadeOut');

                console.log("mažu");


                complexContainer.addEventListener('animationend', function handleAnimationEnd() {
                    complexContainer.style.display = 'none';
                    form4.reset();
                    complexContainer.classList.remove('fadeOut');
                    complexContainer.removeEventListener('animationend', handleAnimationEnd);
                }, { once: true });
            }
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
