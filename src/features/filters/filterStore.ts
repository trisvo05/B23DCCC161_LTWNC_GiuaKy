import { create } from "zustand";
import type { Category } from "@/src/types/book";

export type CategoryFilter = "Tất cả" | Category;

interface FilterState {
  keyword: string;
  category: CategoryFilter;
  setKeyword: (value: string) => void;
  setCategory: (value: CategoryFilter) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  keyword: "",
  category: "Tất cả",
  setKeyword: (keyword) => set({ keyword }),
  setCategory: (category) => set({ category }),
}));
