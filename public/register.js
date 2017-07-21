window.addEventListener('load', function () {
  document.getElementsByTagName('body')[0].addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      onSubmit();
    }
  });
}, false)
function sendCheckCode(obj){
  var mobileNumber = document.getElementById('mobileNumber').value;
  if (!mobileNumber) { alert('手机号不能为空'); return; }
  checkPhone(mobileNumber)
  // settime(obj)
  var data = 'phone=' + encodeURIComponent(mobileNumber) + '&templatCode=' + encodeURIComponent('RESET_LOGIN_PASSWORD_SMS')+ '&userName=' + encodeURIComponent('');
  var xhr = new XMLHttpRequest();
  xhr.open('post', '/ajax/sendCheckcode');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'json';
  xhr.onload = function () {
    if (!xhr.response.success) {
      alert(xhr.response.information);
    } else {
      alert('验证码发送成功');
      settime(obj)
    }
  };
  xhr.onerror = function () {
    console.log('出错了');
  };
  xhr.send(data);
}
function onSubmit() {
  // document.getElementById('mobileNumber').value = '15213498394';
  // document.getElementById('password').value = '123456';

  var mobileNumber = document.getElementById('mobileNumber').value;
  var identCode = document.getElementById('identCode').value;
  var loginPassword = document.getElementById('loginPassword').value;
  var password = document.getElementById('password').value;

  if (!mobileNumber) { alert('手机号不能为空'); return; }
  checkPhone(mobileNumber)
  if (!identCode) { alert('验证码不能为空'); return; }
  if (!loginPassword) { alert('登录密码不能为空'); return; }
  if (!password) { alert('确认密码不能为空'); return; }
  if (loginPassword != password) { alert('登录密码与确认密码不一致'); document.getElementById('password').value = ''; return; }

  var data = 'identCode=' + encodeURIComponent(identCode) + '&mobileNumber=' + encodeURIComponent(mobileNumber)+ '&loginPassword=' + encodeURIComponent(loginPassword);
  var xhr = new XMLHttpRequest();
  xhr.open('post', '/ajax/createActor');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'json';
  xhr.onload = function () {
    if (!xhr.response.success) {
      alert(xhr.response.information);
    } else {
      alert('注册成功');
      location.href = '/login';
    }
  };
  xhr.onerror = function () {
    console.log('出错了');
  };
  xhr.send(data);
}
function checkPhone(phone){ 
    if(!(/^1[34578]\d{9}$/.test(phone))){ 
        alert("手机号码有误，请重填");  
        return false; 
    } 
}

var countdown=60; 
function settime(obj) { 
    if (countdown == 0) { 
        obj.removeAttribute("disabled");    
        obj.value="获取验证码"; 
        countdown = 60; 
        return;
    } else { 
        obj.setAttribute("disabled", true); 
        obj.value="重新发送(" + countdown + ")"; 
        countdown--; 
    } 
setTimeout(function() { 
    settime(obj) }
    ,1000) 
}
