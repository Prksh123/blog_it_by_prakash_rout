// components/posts/PostHeader.tsx
import React, { useState } from "react";

import { Check, MenuHorizontal, ExternalLink } from "@bigbinary/neeto-icons";
import { ActionDropdown, Dropdown } from "@bigbinary/neetoui";
import { Button, PageTitle } from "components/commons";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom/";

import postsApi from "../../apis/posts";

const PostHeader = ({
  title,
  loading,
  status,
  savedStatus,
  onCancel,
  setStatus,
  handleSubmit,
  showOptions = false,
  updatedTime,
}) => {
  const {
    Menu,
    MenuItem: { Button: MenuButton },
  } = ActionDropdown;
  const { slug } = useParams();
  const history = useHistory();

  const label = status?.toLowerCase() === "draft" ? "Save as Draft" : "Publish";
  const [showDeleteDropdown, setShowDeleteDropdown] = useState(false);

  const deletePost = async () => {
    try {
      await postsApi.destroy(slug);
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="flex justify-between px-5">
      <PageTitle title={title} />
      <div className="flex items-end gap-3">
        {showOptions && (
          <div className="mb-2 flex items-center gap-3">
            <span>
              {savedStatus === "draft" ? "Draft saved at " : "Published on "}
              {updatedTime &&
                new Date(updatedTime).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
            </span>
            <Link to={`/posts/${slug}/show`}>
              <ExternalLink className="h-5 w-5 text-gray-600 hover:text-gray-800" />
            </Link>
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <Button
            buttonText="Cancel"
            loading={loading}
            size="medium"
            style="secondary"
            onClick={onCancel}
          />
          <ActionDropdown
            className="neetix-actiondropdown"
            label={label}
            buttonProps={{
              className: "bg-black text-white",
            }}
            dropdownProps={{
              buttonProps: {
                className: "bg-black text-white",
              },
            }}
            onClick={handleSubmit}
          >
            <Menu>
              <MenuButton onClick={() => setStatus("draft")}>
                <span className="inline-block w-4 text-left">
                  {status === "draft" && <Check />}
                </span>
                Save as draft
              </MenuButton>
              <MenuButton onClick={() => setStatus("published")}>
                <span className="inline-block w-4 text-left">
                  {status === "published" && <Check />}
                </span>
                Publish
              </MenuButton>
            </Menu>
          </ActionDropdown>
          {showOptions && (
            <Dropdown
              buttonStyle="text"
              position="bottom-end"
              customTarget={() => (
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => setShowDeleteDropdown(prev => !prev)}
                >
                  <MenuHorizontal size={18} />
                </button>
              )}
            >
              {showDeleteDropdown && (
                <div
                  className="h-7 w-32 cursor-pointer px-4 py-1 text-sm text-red-700"
                  onClick={deletePost}
                >
                  Delete
                </div>
              )}
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
