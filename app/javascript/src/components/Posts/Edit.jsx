import React, { useState, useEffect } from "react";

import { Container, PageLoader } from "components/commons";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import Form from "./Form";

import {
  useShowPostBySlug,
  useUpdatePost,
} from "../../hooks/reactQuery/usePostsApi";
import PostHeader from "../commons/Header";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [status, setStatus] = useState("published");
  const [savedStatus, setSavedStatus] = useState("published");
  const [updatedTime, setUpdatedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const history = useHistory();

  const { data, isLoading } = useShowPostBySlug(slug);
  const { mutate: updatePost } = useUpdatePost();

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);

    updatePost(
      {
        slug,
        payload: {
          title,
          description,
          category_ids: selectedCategoryIds,
          status,
        },
      },
      {
        onSuccess: () => {
          setLoading(false);
          history.push("/");
        },
        onError: error => {
          setLoading(false);
          logger.error(error);
        },
      }
    );
  };

  useEffect(() => {
    if (data) {
      const post = data.post;
      setTitle(post.title);
      setDescription(post.description);
      setSelectedCategoryIds(post.categories?.map(category => category.id));
      setStatus(post.status);
      setUpdatedTime(post.updated_at);
      setSavedStatus(post.status);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex h-full flex-col gap-y-5">
        <PostHeader
          showOptions
          handleSubmit={handleSubmit}
          loading={loading}
          savedStatus={savedStatus}
          setStatus={setStatus}
          setUpdatedTime={setUpdatedTime}
          status={status}
          title="Edit blog post"
          updatedTime={updatedTime}
          onCancel={() => history.goBack()}
        />
        <Form
          description={description}
          handleSubmit={handleSubmit}
          loading={loading}
          selectedCategoryIds={selectedCategoryIds}
          setDescription={setDescription}
          setSelectedCategoryIds={setSelectedCategoryIds}
          setTitle={setTitle}
          title={title}
          type="update"
        />
      </div>
    </Container>
  );
};

export default Edit;
