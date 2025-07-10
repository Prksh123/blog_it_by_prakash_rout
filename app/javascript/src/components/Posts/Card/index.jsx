import React from "react";

import CardItem from "./CardItem";

const Card = ({ data, showPost }) => (
  <div className="flex w-full flex-col gap-2">
    {data.map(
      ({ id, title, description, created_at, slug, user, categories }) => (
        <CardItem
          categoryNames={categories}
          created_at={created_at}
          description={description}
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
