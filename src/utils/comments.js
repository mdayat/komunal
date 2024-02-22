import { API_BASE_URL } from "./config";
import { votePromise } from "./vote";

function createComment(comment, threadID) {
  const promise = new Promise((resolve, reject) => {
    const endpoint = `/threads/${threadID}/comments`;
    const accessToken = localStorage.getItem("accessToken");

    fetch(API_BASE_URL + endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          resolve(res.data.comment);
        } else {
          const err = new Error(res.message);
          reject(err);
        }
      });
  });
  return promise;
}

function upVoteComment(threadID, commentID) {
  const endpoint = `/threads/${threadID}/comments/${commentID}/up-vote`;
  return votePromise(endpoint);
}

function downVoteComment(threadID, commentID) {
  const endpoint = `/threads/${threadID}/comments/${commentID}/down-vote`;
  return votePromise(endpoint);
}

function neutralVoteComment(threadID, commentID) {
  const endpoint = `/threads/${threadID}/comments/${commentID}/neutral-vote`;
  return votePromise(endpoint);
}

export { createComment, upVoteComment, downVoteComment, neutralVoteComment };
