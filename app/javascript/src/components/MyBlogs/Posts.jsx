import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import { isNil, isEmpty, either } from "ramda";

import Table from "./Table";

import postsApi from "../../apis/posts";
import { PageLoader } from "../commons";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.myPosts();
      setPosts(posts);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(posts)) {
    return (
      <Typography className="my-5 text-center text-xl leading-5" style="h1">
        You have not created any posts 🥳
      </Typography>
    );
  }

  return <Table fetchPosts={fetchPosts} posts={posts} />;
};

export default MyPosts;
