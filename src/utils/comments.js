import { votePromise } from "./vote";

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

export { upVoteComment, downVoteComment, neutralVoteComment };
