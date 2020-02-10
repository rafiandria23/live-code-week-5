class User {
  static login(e) {
    e.preventDefault();
    const loginData = $("#loginForm").serialize();
    $.ajax({
      type: "POST",
      url: `${baseURL}/login`,
      data: loginData,
      dataType: "json"
    })
      .done(result => {
        localStorage.setItem("access_token", result.access_token);
        $("#loginContainer").hide(1000);
        $("#registerContainer").hide();
        $("#comicCollection").show(1000);
        $("#btn-logout").show(1000);
        Comic.findAllComics();
      })
      .fail(err => {
        console.log(err);
      });
  }

  static register(e) {
    e.preventDefault();
    const registerData = $("#registerForm").serialize();
    $.ajax({
      type: "POST",
      url: `${baseURL}/register`,
      data: registerData,
      dataType: "json"
    })
      .done(result => {
        localStorage.setItem("access_token", result.access_token);
        $("#loginContainer").hide();
        $("#registerContainer").hide(1000);
        $("#btn-logout").show(1000);
        Comic.findAllComics();
      })
      .fail(err => {
        console.log(err);
      });
  }

  static logout(e) {
    e.preventDefault();
    localStorage.clear();
    $("#loginContainer").show(1000);
    $(".userComponent").hide(1000);
    $("#registerContainer").hide();
    $("#btn-logout").hide(1000);
    $("#alert").hide();
  }

  static showRegisterForm(e) {
    e.preventDefault();
    $(".userComponent").hide();
    $("#loginContainer").hide(1000);
    $("#registerContainer").show(1000);
    $("#btn-logout").hide();
    $("#alert").hide();
  }

  static showLoginForm(e) {
    e.preventDefault();
    $(".userComponent").hide();
    $("#registerContainer").hide(1000);
    $("#loginContainer").show(1000);
    $("#btn-logout").hide();
    $("#alert").hide();
  }
}
