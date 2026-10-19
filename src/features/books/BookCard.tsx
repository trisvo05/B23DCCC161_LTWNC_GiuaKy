
import { memo } from "react";
import Image from "next/image";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import type { Book } from "@/src/types/book";

interface Props {
  book: Book;
  borrowed: boolean;
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
}

function BookCardView({ book, borrowed, onBorrow, onReturn }: Props) {
  return (
    <article className="book-card">
      <Image
        className="cover-image"
        src={book.coverImage}
        alt={`Bìa sách ${book.title}`}
        width={400}
        height={280}
        unoptimized
      />
      <div className="book-info">
        <div className="book-meta"><span>{book.category}</span><span>·</span><span>{book.year}</span></div>
        <h3>{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="book-bottom">
          <span className={`availability ${book.available === 0 ? "out" : ""}`}>
            <span className="status-dot" />
            {book.available === 0 ? "Đã hết sách" : `Còn ${book.available} bản`}
          </span>
          {borrowed ? (
            <Button size="small" variant="outline" onClick={() => onReturn(book.id)} aria-label={`Trả ${book.title}`}>
              <RotateCcw size={14} /> Trả
            </Button>
          ) : (
            <Button size="small" onClick={() => onBorrow(book.id)} disabled={book.available === 0} aria-label={`Mượn ${book.title}`}>
              Mượn <ArrowUpRight size={14} />
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export const BookCard = memo(BookCardView);
