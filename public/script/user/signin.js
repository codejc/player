function signin() {
    $('form span').html("");
    var username = $('#username').val();
    var password = $('#password').val();
    var data = {
        "username": username,
        "password": password
    };
    $.ajax({
        url: '/user/signin',
        type: 'POST',
        data: data,
        success: function(res) {
            if (res.code == '1') {
                location.href = '/';
            } else {
                $('#signInView form span').html("用户名密码错误");
            }
        }
    });
}