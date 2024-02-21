import { API_BASE_URL } from "./config";

function votePromise(endpoint) {
  const accessToken = localStorage.getItem("accessToken");
  return new Promise((resolve, reject) => {
    fetch(API_BASE_URL + endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          resolve();
        } else {
          const err = new Error(res.message);
          reject(err);
        }
      });
  });
}

export { votePromise };
