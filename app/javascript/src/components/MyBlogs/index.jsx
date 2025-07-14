import React from "react";

import MyPosts from "./Posts";

import { Container, PageTitle } from "../commons";

const index = () => (
  <Container className="max-h-screen w-full">
    <div className="flex w-full flex-col gap-y-6 ">
      <div className="flex items-end justify-between">
        <PageTitle title="My blog posts" />
      </div>
      <MyPosts />
    </div>
  </Container>
);

export default index;
