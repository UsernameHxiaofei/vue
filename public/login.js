window.addEventListener('load', function () {
  document.getElementsByTagName('body')[0].addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      loginOn();
    }
  });
}, false)

function load(){
  document.getElementById('userName').value=sessionStorage.getItem('rea')
  document.getElementById('password').value=sessionStorage.getItem('rep')
}

function loginOn() {


  var username = document.getElementById('userName').value;
  var password = document.getElementById('password').value;
  


  if (!username) { alert('用户名不能为空'); return; }
  if (!password) { alert('密码不能为空'); return; }

  var data = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
  var xhr = new XMLHttpRequest();
  xhr.open('post', '/ajax/login_auth');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'json';
  xhr.onload = function () {
    if (!xhr.response.success) {
      if(document.getElementById('rememberPwd').checked){
          sessionStorage.setItem('rea',username)
          sessionStorage.setItem('rep',password)
      }
      alert(xhr.response.information);
    } else {
      alert('登录成功');
      location.href = '/main';
    }
  };
  xhr.onerror = function () {
    console.log('出错了');
  };
  xhr.send(data);
}
