import React, { useState, useEffect } from "react";

import postsApi from "apis/posts";
import { Container, PageLoader, PageTitle } from "components/commons";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import Form from "./Form";

import { Button } from "../commons";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await postsApi.update({
        slug,
        payload: { title, description, category_ids: selectedCategoryIds },
      });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchPostDetails = async () => {
    try {
      const {
        data: {
          post: { title, description, categories },
        },
      } = await postsApi.show(slug);
      setTitle(title);
      setDescription(description);
      setCategories(categories);
      setSelectedCategoryIds(categories.map(category => category.id));
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
        <div className="flex justify-between px-5">
          <PageTitle title="Edit blog post" />
          <div className="flex items-end gap-5">
            <Button
              buttonText="Cancel"
              loading={loading}
              style="secondary"
              onClick={() => history.goBack()}
            />
            <Button
              buttonText="Publish"
              loading={loading}
              style="primary"
              onClick={handleSubmit}
            />
          </div>
        </div>
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
