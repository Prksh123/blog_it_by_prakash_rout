import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { useShowMyPosts } from "hooks/reactQuery/usePostsApi";
import { isNil, isEmpty, either } from "ramda";

import Table from "./Table";

import { PageLoader } from "../commons";

const MyPosts = () => {
  const { data, isLoading } = useShowMyPosts();
  const posts = data?.posts || [];

  if (isLoading) {
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

  return <Table posts={posts} />;
};

export default MyPosts;
