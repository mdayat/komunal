import { API_BASE_URL } from "./config";

function getThreads() {
  const promise = new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/threads`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          resolve(res.data.threads);
        } else {
          const err = new Error(res.message);
          reject(err);
        }
      });
  });
  return promise;
}

function createThread(thread) {
  const promise = new Promise((resolve, reject) => {
    const accessToken = localStorage.getItem("accessToken");
    fetch(`${API_BASE_URL}/threads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(thread),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          resolve(res.data.thread);
        } else {
          const err = new Error(res.message);
          reject(err);
        }
      });
  });
  return promise;
}

export { getThreads, createThread };
