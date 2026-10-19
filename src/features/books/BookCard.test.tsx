import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookCard } from "./BookCard";
import type { Book } from "@/src/types/book";

const book: Book = { id: "b1", title: "Clean Code", author: "Robert C. Martin", category: "CNTT", year: 2008, available: 2, coverImage: "https://picsum.photos/seed/minilibrary-1/400/280" };

describe("BookCard", () => {
  it("hiển thị thông tin sách", () => {
    render(<BookCard book={book} borrowed={false} onBorrow={jest.fn()} onReturn={jest.fn()} />);
    expect(screen.getByRole("heading", { name: "Clean Code" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Bìa sách Clean Code" })).toHaveAttribute(
      "src",
      expect.stringContaining("picsum.photos"),
    );
    expect(screen.getByText("Robert C. Martin", { selector: ".book-author" })).toBeInTheDocument();
    expect(screen.getByText("Còn 2 bản")).toBeInTheDocument();
  });

  it("gọi hàm mượn với đúng id", async () => {
    const onBorrow = jest.fn();
    render(<BookCard book={book} borrowed={false} onBorrow={onBorrow} onReturn={jest.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: "Mượn Clean Code" }));
    expect(onBorrow).toHaveBeenCalledWith("b1");
  });

  it("vô hiệu hóa mượn khi hết bản", () => {
    render(<BookCard book={{ ...book, available: 0 }} borrowed={false} onBorrow={jest.fn()} onReturn={jest.fn()} />);
    expect(screen.getByRole("button", { name: "Mượn Clean Code" })).toBeDisabled();
  });
});
