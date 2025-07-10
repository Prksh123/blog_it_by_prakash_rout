import React, { useState } from "react";

import postsApi from "apis/posts";
import { Container, PageTitle } from "components/commons";

import Form from "./Form";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create({ title, description });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex h-full flex-col gap-y-8">
        <PageTitle title="New blog post" />
        <div className="h-3/4 w-full border">
          <Form
            description={description}
            handleSubmit={handleSubmit}
            loading={loading}
            setDescription={setDescription}
            setTitle={setTitle}
            title={title}
          />
        </div>
      </div>
    </Container>
  );
};

export default Create;
