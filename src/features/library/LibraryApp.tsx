"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, ArrowRight, BookMarked, BookOpen, ChartNoAxesCombined, ChevronDown, LibraryBig, Moon, Search, Sun, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useTheme } from "@/src/context/ThemeContext";
import { BookCard } from "@/src/features/books/BookCard";
import { borrowBook, loadBooks, returnBook } from "@/src/features/books/booksSlice";
import { useFilterStore, type CategoryFilter } from "@/src/features/filters/filterStore";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";

const StatsView = lazy(() => import("./StatsView"));
const filters: CategoryFilter[] = ["Tất cả", "CNTT", "Kinh tế", "Ngoại ngữ"];

export default function LibraryApp() {
  const pathname = usePathname();
  const currentPage = pathname === "/stats" ? "stats" : pathname === "/borrowed" ? "borrowed" : "home";
  const showBorrowed = currentPage === "borrowed";
  const dispatch = useAppDispatch();
  const { items, borrowedIds, status, error } = useAppSelector((state) => state.books);
  const { keyword, category, setKeyword, setCategory } = useFilterStore();
  const [searchInput, setSearchInput] = useState(keyword);
  const debounced = useDebounce(searchInput, 300);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => { if (status === "idle") void dispatch(loadBooks()); }, [dispatch, status]);
  useEffect(() => { setKeyword(debounced); }, [debounced, setKeyword]);

  const visibleBooks = useMemo(() => {
    const term = keyword.trim().toLocaleLowerCase("vi");
    return items.filter((book) =>
      (category === "Tất cả" || book.category === category) &&
      (!term || book.title.toLocaleLowerCase("vi").includes(term) || book.author.toLocaleLowerCase("vi").includes(term)) &&
      (!showBorrowed || borrowedIds.includes(book.id)),
    );
  }, [items, category, keyword, showBorrowed, borrowedIds]);

  const handleBorrow = useCallback((id: string) => { dispatch(borrowBook(id)); }, [dispatch]);
  const handleReturn = useCallback((id: string) => { dispatch(returnBook(id)); }, [dispatch]);
  const borrowedBooks = useMemo(() => items.filter((book) => borrowedIds.includes(book.id)), [items, borrowedIds]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" href="/" aria-label="Mini Library - trang chủ"><span className="brand-mark"><img src="/logo.png" alt="Logo" /></span><span><strong>mini library</strong><small>THƯ VIỆN UDU</small></span></Link>
        <div className="nav-label">KHÁM PHÁ</div>
        <nav className="side-nav" aria-label="Điều hướng chính">
          <Link href="/" className={currentPage === "home" ? "active" : ""} aria-current={currentPage === "home" ? "page" : undefined}><BookOpen size={18} /> Danh mục sách</Link>
          <Link href="/borrowed" className={showBorrowed ? "active" : ""} aria-current={showBorrowed ? "page" : undefined}><BookMarked size={18} /> Sách đang mượn <span className="nav-count">{borrowedIds.length}</span></Link>
          <Link href="/stats" className={currentPage === "stats" ? "active" : ""} aria-current={currentPage === "stats" ? "page" : undefined}><ChartNoAxesCombined size={18} /> Thống kê</Link>
        </nav>
        <div className="sidebar-spacer" />
        <div className="borrow-widget">
          <div className="widget-icon"><BookMarked size={19} /></div>
          <strong>Sách của bạn</strong>
          <p>Bạn đang mượn <b>{borrowedIds.length}/3</b> cuốn sách từ thư viện.</p>
          <div className="widget-progress"><span style={{ width: `${borrowedIds.length / 3 * 100}%` }} /></div>
          <Link href="/borrowed">Xem sách đang mượn <ArrowRight size={14} /></Link>
        </div>
        <div className="sidebar-footer"><span className="avatar">SV</span><span><strong>Sinh viên</strong><small>Thư viện UDU</small></span><ChevronDown size={15} /></div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="mobile-brand"><LibraryBig size={22} /><strong>mini library</strong></div>
          <span className="breadcrumb">Thư viện UDU<span>/</span> {currentPage === "stats" ? "Thống kê" : showBorrowed ? "Sách đang mượn" : "Danh mục sách"}</span>
          <div className="top-actions"><button className="theme-toggle" onClick={toggleTheme} aria-label={theme === "light" ? "Chuyển sang giao diện tối" : "Chuyển sang giao diện sáng"} aria-pressed={theme === "dark"}>{theme === "light" ? <Moon size={19} /> : <Sun size={19} />}</button><span className="top-avatar">SV</span></div>
        </header>
        <main className="content">
          {currentPage === "stats" ? (
            <Suspense fallback={<div className="loading-state">Đang tải...</div>}><StatsView /></Suspense>
          ) : (
            <>
              {/* <div className="hero">
                <div className="hero-copy"><span className="hero-kicker"><span /> CHÀO MỪNG ĐẾN VỚI THƯ VIỆN UDU</span><h1>Tri thức trong<br /><em>tầm tay bạn.</em></h1><p>Khám phá những cuốn sách hay, nuôi dưỡng đam mê học hỏi và mở rộng thế giới của riêng bạn.</p><a href="#book-list" className="hero-link">Khám phá sách <ArrowRight size={17} /></a></div>
                <div className="hero-art" aria-hidden="true"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-book art-book-back"><span>KNOWLEDGE</span></div><div className="art-book art-book-front"><span>THE ART OF<br />LEARNING</span><small>MINI LIBRARY COLLECTION</small></div><div className="art-spark spark-one">✦</div><div className="art-spark spark-two">✦</div></div>
              </div> */}

              <div className="quick-stats"><div><span className="quick-icon"><BookOpen size={20} /></span><span><strong>{items.length}</strong><small>Đầu sách đa dạng</small></span></div><div><span className="quick-icon"><LibraryBig size={20} /></span><span><strong>3</strong><small>Lĩnh vực học tập</small></span></div><div><span className="quick-icon"><BookMarked size={20} /></span><span><strong>{borrowedIds.length}<i>/3</i></strong><small>Sách đang mượn</small></span></div></div>

              <section id="book-list" className="catalogue" aria-labelledby="catalogue-title">
                <div className="section-heading"><div><span className="eyebrow">KHÁM PHÁ KHO SÁCH</span><h2 id="catalogue-title">{showBorrowed ? "Sách đang mượn" : "Danh mục sách"}</h2><p>{showBorrowed ? "Những cuốn sách bạn đang đọc." : "Tìm cuốn sách tiếp theo dành cho bạn."}</p></div><span className="result-count">{showBorrowed ? borrowedBooks.length : visibleBooks.length} cuốn sách</span></div>
                <div className="filter-row"><div className="search-wrap"><Search size={19} /><Input aria-label="Tìm theo tên sách hoặc tác giả" placeholder="Tìm tên sách, tác giả..." value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />{searchInput && <button onClick={() => setSearchInput("")} aria-label="Xóa tìm kiếm"><X size={16} /></button>}</div><div className="filter-tabs" role="group" aria-label="Lọc thể loại">{filters.map((filter) => <button key={filter} className={category === filter ? "selected" : ""} onClick={() => setCategory(filter)}>{filter}</button>)}</div></div>
                {status === "loading" || status === "idle" ? <div className="loading-state">Đang tải...</div> : status === "failed" ? <div className="empty-state"><AlertCircle size={30} /><h3>Không thể tải sách</h3><p>{error}</p><Button onClick={() => void dispatch(loadBooks())}>Thử lại</Button></div> : visibleBooks.length === 0 ? <div className="empty-state"><Search size={30} /><h3>Không tìm thấy sách</h3><p>Hãy thử từ khóa hoặc thể loại khác.</p></div> : <div className="books-grid">{visibleBooks.map((book) => <BookCard key={book.id} book={book} borrowed={borrowedIds.includes(book.id)} onBorrow={handleBorrow} onReturn={handleReturn} />)}</div>}
              </section>
            </>
          )}
        </main>

      </div>
      <nav className="mobile-nav" aria-label="Điều hướng di động"><Link href="/" className={currentPage === "home" ? "active" : ""} aria-current={currentPage === "home" ? "page" : undefined}><BookOpen size={20} /><span>Sách</span></Link><Link href="/borrowed" className={showBorrowed ? "active" : ""} aria-current={showBorrowed ? "page" : undefined}><BookMarked size={20} /><span>Đang mượn</span></Link><Link href="/stats" className={currentPage === "stats" ? "active" : ""} aria-current={currentPage === "stats" ? "page" : undefined}><ChartNoAxesCombined size={20} /><span>Thống kê</span></Link></nav>
    </div>
  );
}
