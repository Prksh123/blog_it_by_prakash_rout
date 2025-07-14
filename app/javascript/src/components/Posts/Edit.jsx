import React, { useState, useEffect } from "react";

import postsApi from "apis/posts";
import { Container, PageLoader } from "components/commons";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import Form from "./Form";

import PostHeader from "../commons/Header";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [status, setStatus] = useState("published");
  const [savedStatus, setSavedStatus] = useState("published");
  const [updatedTime, setUpdatedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await postsApi.update({
        slug,
        payload: {
          title,
          description,
          category_ids: selectedCategoryIds,
          status,
        },
      });
      setSavedStatus(status);
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchPostDetails = async () => {
    try {
      const {
        data: {
          post: { title, description, categories, status, updated_at },
        },
      } = await postsApi.show(slug);
      setTitle(title);
      setDescription(description);
      setCategories(categories);
      setSelectedCategoryIds(categories.map(category => category.id));
      setStatus(status);
      setUpdatedTime(updated_at);
      setSavedStatus(status);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (pageLoading) {
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
          type="update"
        />
      </div>
    </Container>
  );
};

export default Edit;
