// PostCard.jsx
import React from "react";

const CardItem = ({
  title,
  created_at,
  showPost,
  slug,
  userName,
  categoryNames,
}) => {
  const date = new Date(created_at);
  const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex h-auto w-full flex-col gap-2 border-b bg-slate-50 p-3">
      <h1
        className="cursor-pointer text-xl font-semibold"
        onClick={() => showPost(slug)}
      >
        {title}
      </h1>
      <div className="mb-2 flex flex-wrap gap-2">
        {categoryNames?.map(category => (
          <span
            className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
            key={category.id}
          >
            {category.name}
          </span>
        ))}
      </div>
      <p className="font-semibold">{userName}</p>
      <p className="text-xs  text-gray-500">{formatted}</p>
    </div>
  );
};

export default CardItem;
