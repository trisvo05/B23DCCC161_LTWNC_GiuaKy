import { configureStore, type Middleware } from "@reduxjs/toolkit";
import booksReducer, { borrowBook, setWarning } from "@/src/features/books/booksSlice";

const borrowLimitMiddleware: Middleware = (api) => (next) => (action) => {
  if (borrowBook.match(action)) {
    const state = api.getState() as { books: { borrowedIds: string[] } };
    if (state.books.borrowedIds.length >= 3 && !state.books.borrowedIds.includes(action.payload)) {
      api.dispatch(setWarning("Bạn chỉ được mượn tối đa 3 cuốn sách cùng lúc."));
      return action;
    }
  }
  return next(action);
};

export const store = configureStore({
  reducer: { books: booksReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(borrowLimitMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
