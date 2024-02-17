import { API_BASE_URL } from "./config";

function register(user) {
  const promise = new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          resolve();
        } else {
          reject(res);
        }
      });
  });
  return promise;
}

function login(user) {
  const promise = new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          resolve(res.data.token);
        } else {
          reject(res);
        }
      });
  });
  return promise;
}

function getProfile() {
  const promise = new Promise((resolve) => {
    const accessToken = localStorage.getItem("accessToken");
    fetch(`${API_BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      });
  });
  return promise;
}

function getUsers() {
  const promise = new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/users`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          resolve(res.data.users);
        } else {
          const err = new Error(err);
          reject(err);
        }
      });
  });
  return promise;
}

export { register, login, getProfile, getUsers };
