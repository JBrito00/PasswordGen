document.getElementById('password-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const length = document.getElementById('length').value;
    const use_uppercase = document.getElementById('uppercase').checked;
    const use_digits = document.getElementById('digits').checked;
    const use_special = document.getElementById('special').checked;

    const response = await fetch('/generate-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ length, use_uppercase, use_digits, use_special }),
    });

    const data = await response.text();
    document.getElementById('password').innerText = data;
    document.getElementById('password-result').style.display = 'block';
});
