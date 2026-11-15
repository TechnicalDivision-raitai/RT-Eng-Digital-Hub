import { useEffect, useState, type FormEvent } from 'react';
import { Link2, Trash2, X } from 'lucide-react';

interface PendingLinkModalProps {
  isOpen: boolean;
  currentUrl: string | null;
  onClose: () => void;
  onSave: (url: string | null) => void;
}

export function PendingLinkModal({
  isOpen,
  currentUrl,
  onClose,
  onSave,
}: PendingLinkModalProps) {
  const [inputValue, setInputValue] = useState(currentUrl ?? '');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setInputValue(currentUrl ?? '');
      setErrorMessage(null);
    }
  }, [isOpen, currentUrl]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = inputValue.trim();

    if (!trimmed) {
      setErrorMessage('กรุณาระบุ URL ของระบบคุมพัสดุ หรือกดล้างลิงก์เพื่อกลับสู่สถานะรออัพเดต');
      return;
    }

    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
        setErrorMessage('ลิงก์ต้องเริ่มต้นด้วย https:// หรือ http://');
        return;
      }
      onSave(parsed.toString());
      onClose();
    } catch {
      setErrorMessage('รูปแบบ URL ไม่ถูกต้อง ตัวอย่างเช่น https://e-inventory.vercel.app/');
    }
  };

  const handleClear = () => {
    onSave(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d2622]/45 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pending-link-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-[#dce5e0] bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#edf2ef] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf4f0] text-[#123b35]">
              <Link2 className="h-5 w-5" />
            </div>
            <div>
              <h2
                id="pending-link-modal-title"
                className="text-lg font-bold text-[#123b35]"
              >
                กำหนดลิงก์ระบบคุมพัสดุ (ชั่วคราว)
              </h2>
              <p className="text-xs text-[#647771]">
                บันทึกไว้ในเบราว์เซอร์เครื่องนี้เพื่อทดสอบหรือใช้งานระหว่างรออัปเดตลิงก์ถาวร
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="ปิดหน้าต่าง"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#5f726c] transition-colors hover:bg-[#f0f4f2] hover:text-[#123b35] focus-visible:outline-2 focus-visible:outline-[#123b35]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="inventory-url-input"
              className="block text-sm font-semibold text-[#1c312c]"
            >
              URL ระบบคุมพัสดุ
            </label>
            <input
              id="inventory-url-input"
              type="url"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="https://example.vercel.app/"
              className="mt-1.5 w-full rounded-xl border border-[#cfd9d4] bg-[#fafcfb] px-3.5 py-2.5 font-mono text-sm text-[#123b35] placeholder:text-[#96a6a0] focus:border-[#123b35] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#123b35]/15"
              autoFocus
            />
            {errorMessage && (
              <p className="mt-2 text-xs font-medium text-[#b42318]" role="alert">
                {errorMessage}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            {currentUrl ? (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-[#ebd3d0] bg-[#fdf6f5] px-4 py-2 text-sm font-semibold text-[#9a2b20] transition-colors hover:bg-[#fbe9e7] whitespace-nowrap shrink-0"
              >
                <Trash2 className="h-4 w-4" />
                <span>ล้างลิงก์ (กลับเป็นรออัพเดต)</span>
              </button>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-2.5 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-[#d6e0db] bg-white px-4 py-2 text-sm font-semibold text-[#42554f] transition-colors hover:bg-[#f2f6f4] whitespace-nowrap shrink-0"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-[#123b35] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1a4f47] whitespace-nowrap shrink-0"
              >
                บันทึกลิงก์
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
