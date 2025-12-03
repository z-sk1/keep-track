const API_BASE = "https://educational-omaha-wireless-protecting.trycloudflare.com";

async function signup() {
    const username = document.getElementById("signUpUsername").value.trim();
    const password = document.getElementById("signUpPassword").value.trim();
    if (!username || !password) {
        alert("Please enter username and password");
        return;
    }

    const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json()
    if (res.ok) {
        alert("Signup succesful! You can login now.");
    } else {
        alert(data.error || "Signup failed");
    }
}

async function login() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    if (!username || !password) {
        alert("Please enter username and password");
        return;
    }

    const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
    } else {
        alert(data.error || "Login failed");
    }
}