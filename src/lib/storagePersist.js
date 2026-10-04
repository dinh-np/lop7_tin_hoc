/**
 * Yêu cầu trình duyệt cấp quyền Persistent Storage
 * Giúp ngăn chặn WebKit/Safari và Chromium tự động giải phóng bộ nhớ đệm Cache/IndexedDB.
 */
export async function enablePersistentStorage() {
  if (typeof window !== "undefined" && navigator.storage && navigator.storage.persist) {
    try {
      const isAlreadyPersisted = await navigator.storage.persisted();
      if (isAlreadyPersisted) {
        console.log(" Bộ nhớ ứng dụng: Đã ở chế độ PERSISTENT (Bền vững).");
        return true;
      }

      const granted = await navigator.storage.persist();
      if (granted) {
        console.log(" Bộ nhớ ứng dụng: Đã được cấp quyền PERSISTENT thành công.");
      } else {
        console.warn(" Bộ nhớ ứng dụng: Trình duyệt từ chối quyền Persistent (Có thể cần 'Add to Home Screen' để kích hoạt).");
      }
      return granted;
    } catch (error) {
      console.error("Lỗi khi kiểm tra Storage Persist:", error);
      return false;
    }
  } else {
    console.log("Trình duyệt không hỗ trợ navigator.storage.persist()");
    return false;
  }
}
