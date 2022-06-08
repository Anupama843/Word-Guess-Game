"use strict";

(function () {

    const loginInputEl = document.querySelector('#login-form .login-input');
    const loginButtonEl = document.querySelector('#login-form .login-button');

    disableLogInButtonIfNoInput();

    function disableLogInButtonIfNoInput() {
        loginButtonEl.disabled = !loginInputEl.value;
        loginInputEl.addEventListener('input', () => {
            loginButtonEl.disabled = !loginInputEl.value;
        });
    }
})();