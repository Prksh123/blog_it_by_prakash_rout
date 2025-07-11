import React, { useState, useEffect } from "react";

import postsApi from "apis/posts";
import { isNil, isEmpty, either } from "ramda";
import { Link, useHistory } from "react-router-dom";

import useCategoryStore from "../../store/categoryStore";
import { PageLoader, PageTitle, Container, Button } from "../commons";
import Card from "../Posts/Card";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { selectedCategories } = useCategoryStore();
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

  const showPost = slug => {
    history.push(`/posts/${slug}/show`);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredPosts = !isEmpty(selectedCategories)
    ? posts.filter(post =>
        post.categories?.some(category =>
          selectedCategories.includes(category.id)
        )
      )
    : posts;

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
        <div className="flex items-end justify-between ">
          <PageTitle title="Blog posts" />
          <Link to="/posts/create">
            <Button buttonText="Add new blog post" />
          </Link>
        </div>
        <Card data={filteredPosts} showPost={showPost} />
      </div>
    </Container>
  );
};

export default Dashboard;
