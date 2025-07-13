import React, { useEffect, useState } from "react";

import { Edit } from "@bigbinary/neeto-icons";
import { Typography } from "antd";
import postsApi from "apis/posts";
import { Container, PageLoader } from "components/commons";
import { useHistory, useParams } from "react-router-dom";

const Show = () => {
  const [post, setPost] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();

  const fetchPostDetails = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setPost(post);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      history.push("/");
    }
  };

  const editPost = slug => {
    history.push(`/posts/${slug}/edit`);
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  const {
    title,
    description,
    created_at,
    categories,
    user: { name },
  } = post;

  const date = new Date(created_at);
  const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Container>
      <div className="gap-y-15 flex w-full flex-col">
        <div className="mt-8 flex w-full items-center justify-center gap-x-6">
          <div className="flex w-11/12 flex-col gap-y-2">
            <div className="mb-2 flex flex-wrap gap-2">
              {categories?.map(category => (
                <span
                  className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
                  key={category.id}
                >
                  {category.name}
                </span>
              ))}
            </div>
            <div className="flex w-full items-end justify-between">
              <h2 className="text-3xl font-semibold">{title}</h2>
              {post.can_edit && <Edit onClick={() => editPost(slug)} />}
            </div>
            <div className="mt-3 flex gap-4">
              <img
                alt="Not found"
                className="h-10 w-10"
                src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
              />
              <div>
                <Typography>{name}</Typography>
                <Typography>{formatted}</Typography>
              </div>
            </div>
            <Typography className="mt-5">{description}</Typography>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Show;
