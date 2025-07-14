import React, { useEffect, useRef, useState } from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Checkbox } from "@bigbinary/neetoui";
import { useUpdatePost, useDeletePost } from "hooks/reactQuery/usePostsApi";
import { useHistory } from "react-router-dom";

const Row = ({ post }) => {
  const {
    title,
    categories: [cat1 = "", cat2 = ""],
    updated_at,
    status,
    slug,
    description,
    categories,
  } = post;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const showRef = useRef();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: updatePost } = useUpdatePost();

  const formatDate = date =>
    new Date(date).toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const history = useHistory();

  const redirectToUpdate = () => {
    history.push(`/posts/${slug}/edit`);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (showRef.current && !showRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showRef]);

  const handleUpdatePost = () => {
    updatePost({
      slug,
      payload: {
        title,
        description,
        category_ids: categories.map(category => category.id),
        status: status === "published" ? "draft" : "published",
      },
    });
  };

  const handleDeletePost = () => {
    deletePost(slug);
  };

  return (
    <tr>
      <td className="px-2 py-2">
        <Checkbox />
      </td>
      <td className="px-2 py-2 text-emerald-500" onClick={redirectToUpdate}>
        {title.slice(0, 30)} {title.length > 50 ? "..." : ""}
      </td>
      <td className="px-2 py-2">
        {cat1.name}
        {cat2 ? "," : ""}
        {cat2.name}
      </td>
      <td className="px-2 py-2">{formatDate(updated_at)}</td>
      <td className="px-2 py-2">{status === "draft" ? "Draft" : "Publish"}</td>
      <td
        className="relative cursor-pointer px-2 py-2"
        ref={showRef}
        onClick={() => setIsMenuVisible(prev => !prev)}
      >
        <MenuHorizontal />
        {isMenuVisible && (
          <div className="absolute right-0 z-20 mt-2 w-48 rounded-md border border-gray-300 bg-white py-1 shadow-xl">
            <div
              className="block cursor-pointer border-b px-3 py-1.5 text-sm hover:bg-gray-100"
              onClick={handleUpdatePost}
            >
              {status === "published" ? "Draft" : "Publish"}
            </div>
            <div
              className="block cursor-pointer px-3 py-1.5 text-sm text-red-500 hover:bg-gray-100"
              onClick={handleDeletePost}
            >
              Delete
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default Row;
