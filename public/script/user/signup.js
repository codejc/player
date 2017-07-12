$('#signUpView form').submit(function(ev) {
    $('form span').html("");
    ev.preventDefault();
    var pass = $(':password').map(function() {
        return $(this).val()
    })
    console.dir(pass)

    if (pass[1] == pass[2]) {
        $.post(
            $(this).attr('action'),
            $(this).serialize(),
            function(data) {
                if (data.code == 'success') {
                    location.href = '/';
                }
            })
    } else {
        $('#signUpView input[type="password"]').css('border', '1px solid orange');
        $('#signUpView form span').html("两次密码不一致");
    }
})