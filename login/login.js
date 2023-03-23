$(document).ready(function(){
    
//show hide modal
    $('.register').click(function () {
        $('.modal').show();
    });
    $('.close').click(function () {
        $('.modal').hide();
    });
    $(window).on('click', function (e) {
      if ($(e.target).is('.modal')) {
        $('.modal').hide();
      }
    });

//create new account
    $('.store').click(function () {
        var name = $('#name').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var birthday = $('#birthday').val();

        localStorage.setItem('user', JSON.stringify({name:name, email:email, password:password, birthday:birthday}))
        // window.localStorage.setItem('name', name)
        // window.localStorage.setItem('password', password)
        // window.localStorage.setItem('email', email)
        // window.localStorage.setItem('birthday', birthday)
        $('.modal').hide();
        alert('create new account successful')                       
    });

//login
    $('.login').click(function () {
        var auth =JSON.parse(window.localStorage.getItem('user'))

        var email = $('#InputEmail').val();
        var password = $('#InputPassword').val();

        if (auth.email == email && auth.password == password) {
            window.open('../adminpage/index.html', '_self').focus();
        } else {
            alert("Password or email is incorrect")
        }
    });

})