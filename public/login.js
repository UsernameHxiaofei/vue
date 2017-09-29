window.addEventListener('load', function () {
  document.getElementsByTagName('body')[0].addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      loginOn();
    }
  });
}, false)
function load(){
  var name=localStorage.getItem('rea');
  if(name.length>0){
    document.getElementById('remeber').checked=true;
  }
  document.getElementById('userName').value=localStorage.getItem('rea')
  document.getElementById('password').value=localStorage.getItem('rep')
}
function loginOn() {
  
  var username = document.getElementById('userName').value;
  var password = document.getElementById('password').value;
  if (!username) { alert('用户名不能为空'); return; }
  if (!password) { alert('密码不能为空'); return; }
  if (!/^1[34578]\d{9}$/.test(username)){
     alert('用户名手机号格式不正确');
     return;
  }
  var data = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
  var xhr = new XMLHttpRequest();
  xhr.open('post', '/ajax/login_auth');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'json';
  xhr.onload = function () {
    var isIE=false;
    if (window.ActiveXObject || "ActiveXObject" in window){
      isIE=true;
    }
    var result=isIE?JSON.parse(xhr.response):xhr.response;
    if (!result.success) {
        alert(result.information);
    } else {
      if(document.getElementById('remeber').checked){
        localStorage.setItem('rea',username)
        localStorage.setItem('rep',password)
      }
      location.href = '/main';
    }
  };
  xhr.onerror = function () {
    console.log('出错了');
  };
  xhr.send(data);
}
