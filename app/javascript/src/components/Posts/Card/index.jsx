import React from "react";

import CardItem from "./CardItem";

const Card = ({ data, showPost, editPost }) => (
  <div className="flex w-full flex-col gap-2">
    {data.map(
      ({ id, title, description, created_at, slug, user, categories }) => (
        <CardItem
          categoryNames={categories}
          created_at={created_at}
          description={description}
          editPost={editPost}
          key={id}
          showPost={showPost}
          slug={slug}
          title={title}
          userName={user?.name}
        />
      )
    )}
  </div>
);

export default Card;
