import { create } from "zustand";

const useCategoryStore = create(set => ({
  selectedCategories: [],
  toggleCategory: id =>
    set(state => {
      const alreadySelected = state.selectedCategories.includes(id);
      const updated = alreadySelected
        ? state.selectedCategories.filter(catId => catId !== id)
        : [...state.selectedCategories, id];

      return { selectedCategories: updated };
    }),
  resetCategories: () => set({ selectedCategories: [] }),
}));

export default useCategoryStore;
