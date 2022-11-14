console.log("Script is loaded");

$('#loginButton').on('click', (e)=>{
    console.log("Clicked");

    fetch(`https://api-server-m3lv.onrender.com/api/posts`)
    .then((res)=>{res.json()})
    .then((data)=>console.log(data))
    .catch((error)=>console.log(error));













    // let username = $('#username').val();
    // let password = $('#password').val();
    // console.log(username);
    // console.log(password);
    // fetch(`https://api-server-m3lv.onrender.com/api/login`, {
    //     method:'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({'username': username, 'password': password})
    // }).then((response)=>response.json())
    // .then((data)=>console.log(data))
    // .catch((error)=>{console.log(error)});
});