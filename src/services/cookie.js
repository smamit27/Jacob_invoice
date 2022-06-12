export function setCookie(name, value, days) {
  try {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  } catch (error) {
    console.log(error);
  }
}

export function getAllCookies(){
  try {
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i=0; i<pairs.length; i++){
      var pair = pairs[i].split("=");
      cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
    }
    return cookies;
  } catch (error) {
    console.log(error);
    return {}
  }
}

export function getCookie(name) {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift()
    }
    return null
  } catch (error) {
    console.log(error);
    return null
  }
}

export function deleteCookie(name) {
  try {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  } catch (error) {
    console.log(error);
  }
}

export function deleteAllCookies() {
  try {
    const cookies = getAllCookies()
    Object.keys(cookies).forEach((item) => deleteCookie(item))
  } catch (error) {
    console.log(error);
  }
}