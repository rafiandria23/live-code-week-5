const baseURL = `http://localhost:3000`;

$(document).ready(() => {
  if (!localStorage.access_token) {
    $(".userComponent").hide();
    $("#registerContainer").hide();
    $("#btn-logout").hide();
    $("#alert").hide();
  }

  $(document).on("click", "#btn-logout", User.logout);
  $(document).on("click", "#loginButton", User.login);
  $(document).on("click", "#preRegisterButton", User.showRegisterForm);
  $(document).on("click", "#registerButton", User.register);
  $(document).on("click", "#preLoginButton", User.showLoginForm);
  $(document).on("click", "#comicUpdateButton", Comic.updateComic);
});
