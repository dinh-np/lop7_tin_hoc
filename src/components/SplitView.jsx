
import PassagePanel from './PassagePanel';
import './PassagePanel.css';

/**
 * SplitView — Ngữ văn: bài thơ (trái, sticky) + nội dung làm bài (phải) trên màn hình ≥ 768px.
 * Mobile: PassagePanel ở trên đầu, có nút thu gọn/mở rộng.
 * Môn không có passage → render children như cũ.
 */
export default function SplitView({ passage, children }) {
  if (!passage) return <>{children}</>;
  return (
    <div className="split-view">
      <PassagePanel passage={passage} />
      <div className="split-main">{children}</div>
    </div>
  );
}
