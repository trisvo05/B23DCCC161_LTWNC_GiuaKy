import type { ApiResult, Book } from "@/src/types/book";

const books: Book[] = [
  { id: "1", title: "Clean Code", author: "Robert C. Martin", category: "CNTT", year: 2008, available: 3, coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrpslTn9BluUbPBF-cDJf7VwUke5WCaK6hRGhkUwid_TV7RGzvP3gTIV8&s=10" },
  { id: "2", title: "Design Patterns", author: "Erich Gamma và cộng sự", category: "CNTT", year: 1994, available: 2, coverImage: "https://bizweb.dktcdn.net/100/580/651/products/81igfc6ofml-1749730456321.jpg?v=1773283031447" },
  { id: "3", title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas", category: "CNTT", year: 2019, available: 0, coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv6jVSnVZb_D6t69mWxZgCJ4UYkswuMIf5F7d6bgiBTbXKn9E31LGuF-U&s=10" },
  { id: "4", title: "Kinh tế học", author: "Paul Samuelson", category: "Kinh tế", year: 2010, available: 4, coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlW1-oxrkK0OH0FWad3gM6h1zyIawfDWb5_BJJ9Udwpmq6aKf7wCSTfkM&s=10" },
  { id: "5", title: "English Grammar in Use", author: "Raymond Murphy", category: "Ngoại ngữ", year: 2019, available: 5, coverImage: "https://sachngoaingugiare.com/wp-content/uploads/2021/10/english-grammar-in-use.jpg" },
  { id: "6", title: "Đắc nhân tâm", author: "Dale Carnegie", category: "Kinh tế", year: 2018, available: 2, coverImage: "https://cdn.hstatic.net/products/200001055148/dac-nhan-tam-bc_b45d7a40a90745cba0167c601d07930d.jpg" },
  { id: "7", title: "You Don't Know JS Yet", author: "Kyle Simpson", category: "CNTT", year: 2020, available: 1, coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrpslTn9BluUbPBF-cDJf7VwUke5WCaK6hRGhkUwid_TV7RGzvP3gTIV8&s=10" },
  { id: "8", title: "Tiếng Nhật cho người mới bắt đầu", author: "The Japan Foundation", category: "Ngoại ngữ", year: 2021, available: 3, coverImage: "https://salt.tikicdn.com/cache/w300/ts/product/47/2f/0f/0434cfe21e853a1584f99255bde98e34.jpg" },
  { id: "9", title: "Tư duy nhanh và chậm", author: "Daniel Kahneman", category: "Kinh tế", year: 2011, available: 0, coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjP7YG8aavjq1yf8VL1NLQQ8kyyZNgCE9NZEyKs3WICgsZw7pGJmVkQLcH&s=10" },
  { id: "10", title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "CNTT", year: 2022, available: 2, coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy4OxxWt1ibZ3pKm2bDfcf8Ka-Uxm1Ukii2HdEzDccWQYpX-NnHve42II&s=10" },
  { id: "11", title: "Oxford Word Skills", author: "Ruth Gairns", category: "Ngoại ngữ", year: 2020, available: 4, coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvUz_nsOOtBtyCNZm07lc63Ywd5lBTM_jkfrnXHBpUN9KzWxrsTWKVQY6e&s=10" },
  { id: "12", title: "Khởi nghiệp tinh gọn", author: "Eric Ries", category: "Kinh tế", year: 2017, available: 2, coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd7xO3VJmf0VdcxpzmGIQcDeEISdowRfSq6H9XFRPvWJ4-WjrOnDCnrLKp&s=10" },
];

export function fetchBooks(shouldFail = false): Promise<ApiResult<Book[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(shouldFail
        ? { ok: false, error: "Không thể tải danh sách sách. Vui lòng thử lại." }
        : { ok: true, data: books.map((book) => ({ ...book })) });
    }, 500);
  });
}
