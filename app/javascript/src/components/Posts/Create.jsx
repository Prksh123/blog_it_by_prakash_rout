import React, { useState } from "react";

import postsApi from "apis/posts";
import { Container } from "components/commons";

import Form from "./Form";

import PostHeader from "../commons/Header";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("draft");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create({
        title,
        description,
        category_ids: selectedCategoryIds,
        status,
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
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
            categories={categories}
            description={description}
            handleSubmit={handleSubmit}
            loading={loading}
            selectedCategoryIds={selectedCategoryIds}
            setCategories={setCategories}
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
