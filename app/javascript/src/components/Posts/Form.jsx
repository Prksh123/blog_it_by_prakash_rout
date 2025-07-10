import React from "react";

import { Input, Button } from "components/commons";

const Form = ({
  type = "create",
  title,
  setTitle,
  loading,
  handleSubmit,
  description,
  setDescription,
}) => (
  <form
    className="mb-4 flex h-full w-full flex-col justify-between space-y-2 p-8"
    onSubmit={handleSubmit}
  >
    <div className="flex flex-col gap-8">
      <Input
        label="Title*"
        placeholder="Enter title"
        value={title}
        onChange={e => setTitle(e.target.value.slice(0, 50))}
      />
      <div className="mb-4">
        <label className="mb-2 block text-sm" htmlFor="description">
          Description*
        </label>
        <textarea
          className="h-32 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="description"
          name="description"
          placeholder="Enter description..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
    </div>
    <div className="flex justify-end gap-5">
      <Button
        buttonText="Cancel"
        loading={loading}
        size="medium"
        style="secondary"
        onClick={() => history.back()}
      />
      <Button
        buttonText={type === "create" ? "Submit" : "Update Task"}
        loading={loading}
        size="medium"
        style="primary"
        type="submit"
      />
    </div>
  </form>
);

export default Form;
