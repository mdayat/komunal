import { API_BASE_URL } from "./config";
import { votePromise } from "./vote";

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

function getThread(threadID) {
  const endpoint = `/threads/${threadID}`;
  const promise = new Promise((resolve, reject) => {
    fetch(API_BASE_URL + endpoint)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          resolve(res.data.detailThread);
        } else {
          const err = new Error(res.message);
          reject(err);
        }
      });
  });
  return promise;
}

function upVoteThread(threadID) {
  const endpoint = `/threads/${threadID}/up-vote`;
  return votePromise(endpoint);
}

function downVoteThread(threadID) {
  const endpoint = `/threads/${threadID}/down-vote`;
  return votePromise(endpoint);
}

function neutralVoteThread(threadID) {
  const endpoint = `/threads/${threadID}/neutral-vote`;
  return votePromise(endpoint);
}

export {
  createThread,
  getThreads,
  getThread,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
};
