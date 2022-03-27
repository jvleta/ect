const form = document.getElementById('contact-form');

if (form) {
    const message = form.querySelector('#msg');
    const name = form.querySelector('#name');
    const email = form.querySelector('#mail');

    form.addEventListener('submit', function (evt) {
        evt.preventDefault();

        const data = {
            message: message.value,
            name: name.value,
            email: email.value,
        };
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
    });
}
