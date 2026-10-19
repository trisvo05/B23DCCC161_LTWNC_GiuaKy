export const categories = ["CNTT", "Kinh tế", "Ngoại ngữ"] as const;
export type Category = (typeof categories)[number];

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  year: number;
  available: number;
  coverImage: string;
}

export type NewBook = Omit<Book, "id">;
export type BookPreview = Pick<Book, "id" | "title" | "author" | "coverImage">;

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export function isApiSuccess<T>(result: ApiResult<T>): result is { ok: true; data: T } {
  return result.ok;
}
