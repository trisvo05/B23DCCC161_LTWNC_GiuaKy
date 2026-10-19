import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchBooks } from "@/src/api/booksApi";
import { isApiSuccess, type Book } from "@/src/types/book";

export interface BooksState {
  items: Book[];
  borrowedIds: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  warning: string | null;
}

export const initialState: BooksState = {
  items: [], borrowedIds: [], status: "idle", error: null, warning: null,
};

export const loadBooks = createAsyncThunk<Book[], boolean | undefined, { rejectValue: string }>(
  "books/load",
  async (shouldFail, { rejectWithValue }) => {
    const result = await fetchBooks(shouldFail);
    return isApiSuccess(result) ? result.data : rejectWithValue(result.error);
  },
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    borrowBook(state, action: PayloadAction<string>) {
      const book = state.items.find((item) => item.id === action.payload);
      if (!book || book.available < 1 || state.borrowedIds.includes(action.payload)) return;
      book.available -= 1;
      state.borrowedIds.push(action.payload);
      state.warning = null;
    },
    returnBook(state, action: PayloadAction<string>) {
      const index = state.borrowedIds.indexOf(action.payload);
      const book = state.items.find((item) => item.id === action.payload);
      if (index < 0 || !book) return;
      state.borrowedIds.splice(index, 1);
      book.available += 1;
      state.warning = null;
    },
    setWarning(state, action: PayloadAction<string | null>) {
      state.warning = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Đã xảy ra lỗi khi tải sách.";
      });
  },
});

export const { borrowBook, returnBook, setWarning } = booksSlice.actions;
export default booksSlice.reducer;
