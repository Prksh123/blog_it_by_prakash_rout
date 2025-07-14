import React, { useState } from "react";

import { Container } from "components/commons";

import Form from "./Form";

import { useCreatePost } from "../../hooks/reactQuery/usePostsApi";
import PostHeader from "../commons/Header";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("published");
  const { mutate: createPost } = useCreatePost();
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    createPost(
      {
        title,
        description,
        category_ids: selectedCategoryIds,
        status,
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

  return (
    <Container>
      <div className="flex h-full flex-col gap-y-8">
        <PostHeader
          handleSubmit={handleSubmit}
          loading={loading}
          setStatus={setStatus}
          status={status}
          title="New Blog Post"
          onCancel={() => history.goBack()}
        />
        <div className="h-3/4 w-full border">
          <Form
            description={description}
            loading={loading}
            selectedCategoryIds={selectedCategoryIds}
            setDescription={setDescription}
            setSelectedCategoryIds={setSelectedCategoryIds}
            setTitle={setTitle}
            title={title}
          />
        </div>
      </div>
    </Container>
  );
};

export default Create;
