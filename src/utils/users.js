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

export { register };
