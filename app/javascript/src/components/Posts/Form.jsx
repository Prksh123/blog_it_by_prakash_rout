import React from "react";

import { Input } from "components/commons";
import Select from "react-select";

import { useFetchCategories } from "../../hooks/reactQuery/useCategoryApi";

const Form = ({
  title,
  setTitle,
  description,
  setDescription,
  selectedCategoryIds,
  setSelectedCategoryIds,
}) => {
  const { data } = useFetchCategories();
  const categories = data?.categories || [];
  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

  const selectedOptions = categoryOptions.filter(option =>
    selectedCategoryIds.includes(option.value)
  );

  const handleCategoryChange = selectedOptions => {
    const ids = selectedOptions.map(option => option.value);
    setSelectedCategoryIds(ids);
  };

  return (
    <form className="mb-4 flex h-full w-full flex-col justify-between space-y-2 p-8">
      <div className="flex h-full flex-col gap-8">
        <Input
          label="Title*"
          placeholder="Enter title"
          value={title}
          onChange={e => setTitle(e.target.value.slice(0, 50))}
        />
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-800">
            Categories
          </label>
          <Select
            isMulti
            className="text-sm"
            classNamePrefix="react-select"
            options={categoryOptions}
            value={selectedOptions}
            onChange={handleCategoryChange}
          />
        </div>
        <div className="mb-4 h-full">
          <label className="mb-2 block text-sm" htmlFor="description">
            Description*
          </label>
          <textarea
            className="h-3/4 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="description"
            name="description"
            placeholder="Enter description..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

export default Form;
