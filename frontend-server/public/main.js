
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
                onLogin(); //change colors
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

function onLogin(){
    const test = /user_id\d+/;      
    
    //this function will set all the comments to your color
    let posts = $('.main').children()

    for(let i = 0; i < posts.length; i++){
        let classes = posts[i].className;
        let id = classes.match(test)[0];
        if(id === `user_id${user.user_id}`){
            console.log(posts[i]);
            posts[i].classList.add("userPost");

            $(`#${posts[i].id}`).find('.card-body').append(`
                <div class='row deleteRow'>
                    <button class='btn deleteButton' id='delete${posts[i].id}'>Delete</button>
                </div>
            `).on('click', deletePost);

        }
    }
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
        
    })
    .catch((error)=>{
        console.log(error);
    });
}















