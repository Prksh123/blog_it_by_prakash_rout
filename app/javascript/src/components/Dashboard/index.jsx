import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { useShowPosts } from "hooks/reactQuery/usePostsApi";
import { isNil, isEmpty, either } from "ramda";
import { Link, useHistory } from "react-router-dom";

import useCategoryStore from "../../store/categoryStore";
import { PageLoader, PageTitle, Container, Button } from "../commons";
import Card from "../Posts/Card";

const Dashboard = () => {
  const history = useHistory();
  const { selectedCategories } = useCategoryStore();
  const { data, isFetching } = useShowPosts();
  const posts = data?.posts || [];

  const showPost = slug => {
    history.push(`/posts/${slug}/show`);
  };

  const filteredPosts = !isEmpty(selectedCategories)
    ? posts.filter(post =>
        post.categories?.some(category =>
          selectedCategories.includes(category.id)
        )
      )
    : posts;

  if (isFetching) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(posts)) {
    return (
      <Container>
        <div className="flex items-end justify-between ">
          <PageTitle title="Blog posts" />
          <Link to="/posts/create">
            <Button buttonText="Add new blog post" />
          </Link>
        </div>
        <Typography
          className="my-10 h-full w-full text-center text-xl leading-5"
          style="h1"
        >
          You have not created any posts 🥳
        </Typography>
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
