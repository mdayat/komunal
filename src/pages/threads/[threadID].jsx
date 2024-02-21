import Head from "next/head";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { Loading as ThreadDetailLoading } from "../../components/ThreadDetail/Loading";
import { asyncGetThreadDetailAndComments } from "../../states/action";
import { asyncPreloadProcess } from "../../states/preload/action";

// Dynamic loaded components
const NotFound = dynamic(() =>
  import("../../components/NotFound").then((notFound) => notFound.NotFound)
);
const ThreadDetail = dynamic(() =>
  import("../../components/ThreadDetail").then(
    (threadDetail) => threadDetail.ThreadDetail
  )
);
const CommentList = dynamic(() =>
  import("../../components/CommentList").then(
    (commentList) => commentList.CommentList
  )
);

function ThreadDetailPage() {
  const [loading, setLoading] = useState(true);
  const { query, isReady } = useRouter();

  const threadDetail = useSelector((states) => states.threadDetail);
  const comments = useSelector((states) => states.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isReady) {
      dispatch(asyncPreloadProcess());
      dispatch(
        asyncGetThreadDetailAndComments(query.threadID, () => {
          setLoading(false);
        })
      );
    }
  }, [isReady, dispatch, query]);

  if (loading === false && threadDetail === null) {
    return <NotFound />;
  }

  return (
    <>
      <Head>
        <title>
          {loading ? "Komunal | Komunikasi Massal" : threadDetail.title}
        </title>
      </Head>

      {loading ? (
        <ThreadDetailLoading />
      ) : (
        <>
          <ThreadDetail
            id={threadDetail.id}
            title={threadDetail.title}
            body={threadDetail.body}
            category={threadDetail.category}
            createdAt={threadDetail.createdAt}
            upVotesBy={threadDetail.upVotesBy}
            downVotesBy={threadDetail.downVotesBy}
            owner={threadDetail.owner}
          />

          <CommentList comments={comments} />
        </>
      )}
    </>
  );
}

export default ThreadDetailPage;
