
var user;

console.log("Script is loaded");
$('#loginModal').modal('show')

load();

$('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
});

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
    }).then((response)=>{
        if(response.status === 202){
            response.json().then(data=>{
                user = data;
                $('#userNameSpot').text(`@${user.username}`);
                load(); 
                $('#loginModal').modal('hide')
            });
        }else{
            response.text().then(data=>{
                if(data === "Incorrect Password"){
                    console.log(data);
                }else if(data === "User Not Found"){
                    console.log(data);
                }
            });
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
$('#createPostButton').on('click', (e)=>{
    $('#postModal').modal('show');
});
$('#postButton').on('click', createPost);
$('#homeButton').on('click', load);
$('#myPostsButton').on('click', ()=>{
    $('.main').children().hide();
    $('.userPost').show();
});

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
    }).then(response=>{
        if(response.status === 201){
            response.json().then(data=>{
                console.log("Logged in and new account");
                user = data;
                $('#userNameSpot').text(`@${user.username}`);
                load();
                $('#createAccountModal').modal('hide')
            });
        }else{
            response.text().then(data=>{
                if(data === "Username already exists"){
                    $('#createError').text(`This username is taken`);
                }
            });
        }
    })
    .catch((error)=>{console.log(error)});
}

function renderPost({post_id, username, user_id, content}){
    let $card = $(`<div class='infoCard card user_id${user_id}' id='post${post_id}'></div>`);
    let $cardBody = $(`<div class='card-body'></div>`);

    $cardBody.append(`
        <div class="row">
            <h6>@${username}</h6>
        </div>
        <div class="row">
            <p>${content}</p>
        </div>
    `);

    if(user != undefined){
        if(user.user_id === user_id){
            $card.addClass('userPost');
            $cardBody.append(`
                <div class='row deleteRow'>
                    <button class='btn deleteButton' id='delete${post_id}'>Delete</button>
                </div>
            `).on('click', deletePost);
        }
    }


    $card.append($cardBody);

    $('.main').append($card);
}

function load(){
    $('.main').empty();
    fetch(`https://api-server-m3lv.onrender.com/api/posts`, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response=>response.json())
    .then(data=>{
        console.log(data)
        for(let i = data.length - 1; i >= 0; i--){
            
            renderPost(data[i]);
        }
    })
    .catch((error)=>{
        console.log(error);
    })
}

function createPost(){
    let postContent = $('#postContent').val();
    console.log(postContent);

    fetch(`https://api-server-m3lv.onrender.com/api/posts/new`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'user_id': user.user_id, 'content': postContent})
    }).then((response)=>{
        if(response.status === 201){
            load();
            $('#postModal').modal('hide');
        }
    })
    .catch((error)=>{console.log(error)});
    
}

function deletePost(e){
    let test = /\d+/;
    let post_id = e.target.id.match(test)[0];
    console.log(post_id)

    fetch(`https://api-server-m3lv.onrender.com/api/posts/${post_id}`, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response)=>{
        load(user.user_id);
    })
    .catch((error)=>{
        console.log(error);
    });
}















