import { API_BASE_URL } from "./config";

function getThreads() {
  const promise = new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/threads`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          resolve(res.data.threads);
        } else {
          const err = new Error(err);
          reject(err);
        }
      });
  });
  return promise;
}

export { getThreads };
