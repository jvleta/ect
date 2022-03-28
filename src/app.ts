export {};

const form = document.getElementById('contact-form');
const messageDiv: HTMLDivElement = document.querySelector('#show-message');

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const message: HTMLInputElement = form.querySelector('#msg');
        const name: HTMLInputElement = form.querySelector('#name');
        const email: HTMLInputElement = form.querySelector('#mail');

        const data = {
            message: message.value,
            name: name.value,
            email: email.value,
        };

        let incorrectInput = '';

        if (data.name === '') {
            incorrectInput += '<li>Please specify a name</li>';
        }

        if (data.email === '') {
            incorrectInput += '<li>Please specify an email address</li>';
        }

        if (data.message === '') {
            incorrectInput += '<li>Please include a message</li>';
        }

        if (incorrectInput !== '') {
            incorrectInput = `<ul>${incorrectInput}</ul>`;
        }
        console.log(incorrectInput);

        if (incorrectInput !== '') {
            messageDiv.innerHTML = incorrectInput;
            messageDiv.style.color = 'red';
            event.preventDefault();
        } else {
            event.preventDefault();
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

            messageDiv.innerHTML = 'message was sent!';
            messageDiv.style.color = 'black';
        }
    });
}
