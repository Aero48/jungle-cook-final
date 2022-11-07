var userInfo = {};

export function changePage(pageID, callback) {
  if (pageID == "" || pageID == "home") {
    $.get(`pages/home.html`, function (contents) {
      $("#app").html(contents);
      console.log(pageID);
    });
  } else if (pageID == "login") {
    $.get(`pages/login.html`, function (data) {
      $("#app").html(data);
      callback();
    });
  } else {
    $.get(`pages/${pageID}.html`, function (contents) {
      $("#app").html(contents);
      console.log(pageID);
    });
  }
}

export function setUserInfo(userObject) {
  userInfo = userObject;
  console.log(userInfo);
}
