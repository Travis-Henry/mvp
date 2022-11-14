console.log("Script is loaded");
$('#loginModal').modal('show')

$('#loginButton').on('click', (e)=>{            //login button listener
    let username = $('#username').val();
    let password = $('#password').val();
    console.log(username);
    console.log(password);
    fetch(`https://api-server-m3lv.onrender.com/api/login`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'username': username, 'password': password})
    }).then(response=>response.text())
    .then((data)=>{
        if(data === "Logged In"){
            console.log(data);
            console.log("Change site here");
            $('#loginModal').modal('hide')
        }else if(data === "Incorrect Password"){
            console.log(data);
        }else if(data === "User Not Found"){
            console.log(data);
        }
    })
    .catch((error)=>{console.log(error)});
});
$('#createAccountButton').on('click', (e)=>{    //opens create account modal
    $('#loginModal').modal('hide');
    $('#createAccountModal').modal('show');
});
$('#backButton').on('click', (e)=>{            //opens login modal
    $('#createAccountModal').modal('hide');
    $('#loginModal').modal('show');
});
$('#createAccount').on('click', createAccount);   //listener when you push create account button

function createAccount(){
    let username = $('#newUsername').val();
    let newPassword = $('#newPassword').val();
    let confirmPassword = $('#confirmPassword').val();

    if(username === '' || newPassword === '' || confirmPassword ===''){
        $('#createError').text(`Please fill all fields`);
    }
    if(newPassword !== confirmPassword){
        $('#createError').text(`Passwords do not match`);
    }

    fetch(`https://api-server-m3lv.onrender.com/api/login/new`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'username': username, 'password': newPassword})
    }).then(response=>response.text())
    .then((data)=>{
        if(data === "New account created"){
            console.log("Logged in and new account");
            $('#createAccountModal').modal('hide')
        }else if(data === "Username already exists"){
            $('#createError').text(`This username is taken`);
        }
    })
    .catch((error)=>{console.log(error)});
}

function renderPost(){

}

function load(){
    // fetch(`https://api-server-m3lv.onrender.com/api/posts`, {
    //     method:'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({'username': username, 'password': newPassword})
    // })
}















