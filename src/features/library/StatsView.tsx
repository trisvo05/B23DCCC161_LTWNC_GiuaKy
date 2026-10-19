import { BookOpen, Layers3, UsersRound } from "lucide-react";
import { useAppSelector } from "@/src/store/hooks";
import { categories } from "@/src/types/book";

export default function StatsView() {
  const { items, borrowedIds } = useAppSelector((state) => state.books);
  return (
    <section className="stats-page" aria-labelledby="stats-title">
      <div className="section-heading">
        <div><span className="eyebrow">TỔNG QUAN THƯ VIỆN UDU</span><h1 id="stats-title">Thống kê</h1><p>Thông tin đầu sách và hoạt động mượn hiện tại.</p></div>
      </div>
      <div className="stats-cards">
        <article className="stat-card"><div className="stat-icon"><BookOpen size={22} /></div><span>Tổng đầu sách</span><strong>{items.length}</strong><small>trong thư viện UDU</small></article>
        <article className="stat-card"><div className="stat-icon"><UsersRound size={22} /></div><span>Đang mượn</span><strong>{borrowedIds.length}</strong><small>trên tối đa 3 cuốn</small></article>
        <article className="stat-card"><div className="stat-icon"><Layers3 size={22} /></div><span>Thể loại</span><strong>{categories.length}</strong><small>lĩnh vực học tập</small></article>
      </div>
      <div className="category-panel"><h2>Đầu sách theo thể loại</h2><p>Phân bố danh mục trong thư viện</p>
        <div className="category-bars">{categories.map((category) => {
          const count = items.filter((book) => book.category === category).length;
          return <div className="bar-row" key={category}><div><span>{category}</span><strong>{count} đầu sách</strong></div><div className="bar-track"><div style={{ width: `${items.length ? count / items.length * 100 : 0}%` }} /></div></div>;
        })}</div>
      </div>
    </section>
  );
}
