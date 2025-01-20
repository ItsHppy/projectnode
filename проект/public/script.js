document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;


    const user = ({ username, email, password });
    

    localStorage.setItem('users', JSON.stringify(user));

    document.getElementById('message').innerText = 'Регистрация прошла успешно!';
    
   
    document.getElementById('registrationForm').reset();
});



document.querySelector("#penis").addEventListener('click', function() { 
    window.location = './index69/index.html';
    localStorage.setItem('xyu', JSON.parse(localStorage.getItem('users')).username);


});