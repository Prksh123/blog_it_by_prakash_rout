// PostCard.jsx
import React from "react";

const CardItem = ({ title, description, created_at, showPost, slug }) => {
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
      <p className="text-sm">{description.slice(0, 400)}...</p>
      <p className="text-xs  text-gray-500">{formatted}</p>
    </div>
  );
};

export default CardItem;
