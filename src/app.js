const form = document.getElementById('contact-form');
const errorDiv = document.querySelector('#show-error');

if (form) {
    form.addEventListener('submit', (error) => {
        const message = form.querySelector('#msg');
        const name = form.querySelector('#name');
        const email = form.querySelector('#mail');

        let incorrectInput = '';
        console.log(name);
        const firstLetter = name.value[0];

        // Return true if first letter is uppercase
        const firstLetterIsUpperCase = firstLetter === firstLetter.toUpperCase();

        if (!firstLetterIsUpperCase) {
            incorrectInput += ' The first letter of username must be uppercase.\n';
        }

        if (incorrectInput !== '') {
            // Change the error div tag to display the error message(s)
            errorDiv.innerText = incorrectInput;
            // Change the color of the text to red
            errorDiv.style.color = 'red';
            // Prevent the form button from submitting again, before fixing the issues
            error.preventDefault();
        } else {
            const data = {
                message: message.value,
                name: name.value,
                email: email.value,
            };
            error.preventDefault();

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            };

            fetch(
                'https://us-central1-elk-creek-tutors.cloudfunctions.net/send_email',
                options
            )
                .then((response) => response.json())
                .then((response) => console.log(response))
                .catch((err) => console.error(err));

            errorDiv.innerText = 'message was sent!';
            errorDiv.style.color = 'black';
            error.preventDefault();
        }
    });
}
