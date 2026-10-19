import reducer, { borrowBook, initialState, loadBooks, returnBook, setWarning } from "./booksSlice";
import type { Book } from "@/src/types/book";

const book: Book = { id: "a", title: "Test", author: "Author", category: "CNTT", year: 2024, available: 2, coverImage: "https://picsum.photos/seed/minilibrary-1/400/280" };
const ready = { ...initialState, items: [book], status: "succeeded" as const };

describe("booksSlice", () => {
  it("xử lý trạng thái loading", () => {
    const state = reducer(initialState, loadBooks.pending("request", undefined));
    expect(state.status).toBe("loading");
    expect(state.error).toBeNull();
  });

  it("lưu sách khi tải thành công", () => {
    const state = reducer(initialState, loadBooks.fulfilled([book], "request", undefined));
    expect(state.items).toEqual([book]);
    expect(state.status).toBe("succeeded");
  });

  it("hiện lỗi khi tải thất bại", () => {
    const state = reducer(initialState, loadBooks.rejected(null, "request", undefined, "Lỗi API"));
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Lỗi API");
  });

  it("mượn sách giảm số bản và lưu id", () => {
    const state = reducer(ready, borrowBook("a"));
    expect(state.items[0].available).toBe(1);
    expect(state.borrowedIds).toEqual(["a"]);
  });

  it("trả sách tăng số bản và xóa id", () => {
    const state = reducer({ ...ready, borrowedIds: ["a"], items: [{ ...book, available: 1 }] }, returnBook("a"));
    expect(state.items[0].available).toBe(2);
    expect(state.borrowedIds).toEqual([]);
  });

  it("lưu cảnh báo", () => {
    expect(reducer(initialState, setWarning("Giới hạn")).warning).toBe("Giới hạn");
  });
});
