var userService = {
  userLogin: function(userName, password, callback) {
    var user ={
      userName:"admin",
      password:"123456"
    }
    if (callback) {
        callback(user, null);
    }
    window.userService.setUser(user);

  },
  getUser: function() {
    return JSON.parse(sessionStorage.getItem('ua_session'));
  },
  setUser: function(userData) {
    sessionStorage.setItem('ua_session', JSON.stringify(userData));
  },
  removeUser: function() {
    sessionStorage.removeItem('ua_session');
  }
};

window.userService = userService;
