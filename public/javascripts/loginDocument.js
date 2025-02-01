function sendFormula(username_id,password_id) {
    const username_value = document.getElementById(username_id).value;
    const password_value = document.getElementById(password_id).value;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/users/login", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Login details sent successfully");
        }
    };
    xhr.send(JSON.stringify({ username: username_value, password: password_value }));
}

