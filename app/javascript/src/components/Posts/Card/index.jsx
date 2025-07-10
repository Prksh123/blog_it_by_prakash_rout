import React from "react";

import CardItem from "./CardItem";

const Card = ({ data, showPost }) => (
  <div className="flex w-full flex-col gap-2">
    {data.map(({ id, title, description, created_at, slug }) => (
      <CardItem
        created_at={created_at}
        description={description}
        key={id}
        showPost={showPost}
        slug={slug}
        title={title}
      />
    ))}
  </div>
);

export default Card;
