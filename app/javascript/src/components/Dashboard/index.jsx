import React, { useState, useEffect } from "react";

import postsApi from "apis/posts";
import { isNil, isEmpty, either } from "ramda";

import { PageLoader, PageTitle, Container } from "../commons";
import Card from "../Posts/Card";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setPosts(posts);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
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
      <Container>
        <h1 className="my-5 text-center text-xl leading-5">
          You have not created or been assigned any tasks 🥳
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex w-full flex-col gap-y-8 overflow-y-scroll">
        <PageTitle title="Blog posts" />
        <Card data={posts} />
      </div>
    </Container>
  );
};

export default Dashboard;
