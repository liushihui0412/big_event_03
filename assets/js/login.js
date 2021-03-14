$('.link_login').click(function() {
    $('.loginBox').show();
    $('.regBox').hide();
});
$('.link_reg').click(function() {
    $('.loginBox').hide();
    $('.regBox').show();
});


let form = layui.form;
console.log(form);
form.verify({
    pwd: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    repwd: function(value) {
        if (value != $('.regBox input[name=password]').val()) {
            return '两次密码不一致，请重新输入！'
        }
    }
});

let layer = layui.layer;
// 注册页面提交信息至服务器
$('#form_reg').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: '/api/reguser',
        data: {
            username: $('.regBox input[name=username]').val(),
            password: $('.regBox input[name=password]').val()
        },
        success: (res) => {
            console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message, { icon: 5 });
            }
            layer.msg(res.message, { icon: 6 });

            $('#form_reg')[0].reset();
            $('.link_login').click();
        }
    });
})

// 登录页面提交信息至服务器
$('#form_login').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: '/api/login',
        data: $('#form_login').serialize(),
        success: (res) => {
            console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message, { icon: 5 });
            }
            location.href = '/index.html';
            localStorage.setItem('token3', res.token);
        }
    });
})