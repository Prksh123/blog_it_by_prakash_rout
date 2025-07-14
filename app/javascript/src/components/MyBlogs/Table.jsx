import React from "react";

import { Checkbox } from "@bigbinary/neetoui";

import Row from "./Row";

const Table = ({ posts, fetchPosts }) => (
  <table>
    <thead>
      <tr className="bg-gray-100 text-left">
        <th className="px-2 py-2">
          <Checkbox />
        </th>
        <th className="px-2 py-2 ">TITLE</th>
        <th className="px-2 py-2">CATEGORY</th>
        <th className="px-2 py-2">LAST PUBLISHED AT</th>
        <th className="px-2 py-2">STATUS</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {posts.map(post => (
        <Row fetchPosts={fetchPosts} key={post.id} post={post} />
      ))}
    </tbody>
  </table>
);

export default Table;
