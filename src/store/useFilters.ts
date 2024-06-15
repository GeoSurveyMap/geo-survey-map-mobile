import { Category } from 'geo-survey-map-shared-modules';
import { create } from 'zustand';

type AllCategories = {
  [key in Category]: boolean;
};

type FiltersStore = {
  categories: AllCategories;
  toggleCategory: (category: Category) => void;
  reset: () => void;
};

export const useFiltersState = create<FiltersStore>((set) => ({
  categories: {
    [Category.DRY_SOILS]: true,
    [Category.WET_SOILS]: true,
    [Category.EROSION]: true,
    [Category.SEALED_SOILS]: true,
    [Category.DEGRADATION]: true,
    [Category.LOSS_OF_ORGANIC_MATTER]: true,
    [Category.PH]: true,
    [Category.BIODIVERSITY]: true,
  },
  toggleCategory: (category) =>
    set((state) => ({ categories: { ...state.categories, [category]: !state.categories[category] } })),
  reset: () =>
    set(() => ({
      categories: {
        [Category.DRY_SOILS]: true,
        [Category.WET_SOILS]: true,
        [Category.EROSION]: true,
        [Category.SEALED_SOILS]: true,
        [Category.DEGRADATION]: true,
        [Category.LOSS_OF_ORGANIC_MATTER]: true,
        [Category.PH]: true,
        [Category.BIODIVERSITY]: true,
      },
    })),
}));
