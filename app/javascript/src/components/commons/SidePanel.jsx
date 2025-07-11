import React, { useState, useEffect } from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Typography, Input, Modal } from "@bigbinary/neetoui";
import { isEmpty } from "ramda";

import Button from "./Button";

import categoriesApi from "../../apis/categories";
import useCategoryStore from "../../store/categoryStore";

const SidePanel = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const { selectedCategories, toggleCategory } = useCategoryStore();

  const toggleSearch = () => setShowSearch(prev => !prev);

  const loadCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const createNewCategory = async () => {
    try {
      await categoriesApi.create({ category: { name: newCategory } });
      loadCategories();
      setShowModal(false);
      setNewCategory("");
    } catch (error) {
      logger.error(error);
    }
  };

  const searchedCategories = !isEmpty(searchCategory)
    ? categories.filter(category =>
        category.name.toLowerCase().includes(searchCategory.toLowerCase())
      )
    : categories;

  return (
    <div className="flex h-full w-3/12 flex-col bg-slate-100 px-3 py-10 ">
      <div className="flex w-full justify-between px-3">
        <Typography style="h4" weight="bold">
          CATEGORIES
        </Typography>
        <div className="mb-3 flex gap-2">
          <Search onClick={toggleSearch} />
          <Plus onClick={() => setShowModal(prev => !prev)} />
        </div>
      </div>
      <div>
        {showSearch && (
          <Input
            placeholder="Search categories"
            value={searchCategory}
            onChange={event => setSearchCategory(event.target.value)}
          />
        )}
      </div>
      <div className="my-3 w-full">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-2">
            {searchedCategories.map(category => {
              const isSelected = selectedCategories.includes(category.id);

              return (
                <li
                  key={category.id}
                  className={`cursor-pointer rounded border px-3 py-1 text-sm transition
                    ${
                      isSelected
                        ? "border-gray-300 bg-white text-black"
                        : "bg-slate-100 text-gray-700 hover:bg-gray-200"
                    }
                    `}
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <Modal
        closeButton
        closeOnOutsideClick
        className="card flex flex-col justify-evenly gap-4 rounded-md bg-white px-4 py-5 shadow-lg"
        isOpen={showModal}
        size="small"
        onClose={() => setShowModal(false)}
      >
        <Typography style="h2" weight="black">
          New category
        </Typography>
        <Input
          label="Category title"
          placeholder="Enter new title"
          value={newCategory}
          onChange={event => setNewCategory(event.target.value)}
        />
        <div className="flex gap-6 ">
          <Button
            buttonText="Add"
            style="primary"
            onClick={createNewCategory}
          />
          <Button
            buttonText="Cancel"
            style="secondary"
            onClick={() => setShowModal(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default SidePanel;
