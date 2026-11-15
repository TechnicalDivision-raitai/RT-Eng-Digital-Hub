import { useEffect, useState } from 'react';
import { Check, Info, Share2 } from 'lucide-react';
import { Emblem } from './components/Emblem';
import { PendingLinkModal } from './components/PendingLinkModal';
import { SystemCard } from './components/SystemCard';
import { PORTAL_SYSTEMS, type SystemId } from './data/systems';

const STORAGE_KEY_INVENTORY_URL = 'raitai_portal_inventory_custom_url';
const LOGO_ASSET_PATH = '/assets/aistudio/logo-___-_______1c79e6f8.png';

export default function App() {
  const [highlightedId, setHighlightedId] = useState<SystemId | null>(null);
  const [portalCopied, setPortalCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logoLoadError, setLogoLoadError] = useState(false);
  const [customInventoryUrl, setCustomInventoryUrl] = useState<string | null>(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY_INVENTORY_URL);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (customInventoryUrl) {
        window.localStorage.setItem(STORAGE_KEY_INVENTORY_URL, customInventoryUrl);
      } else {
        window.localStorage.removeItem(STORAGE_KEY_INVENTORY_URL);
      }
    } catch {
      // Ignore storage failures in restricted browsing contexts
    }
  }, [customInventoryUrl]);

  const handleJumpToSystem = (id: SystemId) => {
    setHighlightedId(id);
    window.requestAnimationFrame(() => {
      const el = document.getElementById(`system-${id}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    window.setTimeout(() => {
      setHighlightedId((prev) => (prev === id ? null : prev));
    }, 1800);
  };

  const handleCopyPortalLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setPortalCopied(true);
      window.setTimeout(() => setPortalCopied(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top institutional color band */}
      <div
        aria-hidden="true"
        className="h-1 w-full bg-gradient-to-r from-[#123b35] via-[#d6b96c] to-[#1d7250]"
      />

      {/* Top Navigation Bar with Logo in front of Brand Title */}
      <header className="border-b border-[#dce5e0] bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-4 sm:px-6 py-2.5">
          <a
            href="#top"
            className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-[#123b35] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#123b35]"
          >
            {logoLoadError ? (
              <Emblem className="h-9 w-9 shrink-0" />
            ) : (
              <img
                src={LOGO_ASSET_PATH}
                alt="ตราสัญลักษณ์ อบต.ไร่ใต้"
                referrerPolicy="no-referrer"
                onError={() => setLogoLoadError(true)}
                className="h-9 w-9 shrink-0 rounded-full object-contain"
              />
            )}
            <span>กองช่าง อบต.ไร่ใต้</span>
          </a>

          <nav
            aria-label="ทางลัดระบบสารสนเทศ"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-[#475d56]"
          >
            {PORTAL_SYSTEMS.map((sys) => (
              <button
                key={sys.id}
                type="button"
                onClick={() => handleJumpToSystem(sys.id)}
                className="relative py-1 transition-colors hover:text-[#123b35] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#123b35] whitespace-nowrap shrink-0"
              >
                {sys.shortTitle}
              </button>
            ))}
          </nav>

          <div className="shrink-0">
            <button
              type="button"
              onClick={handleCopyPortalLink}
              className="inline-flex min-h-[38px] items-center gap-2 rounded-lg bg-[#123b35] px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#194e46] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123b35] whitespace-nowrap shrink-0"
            >
              {portalCopied ? (
                <>
                  <Check className="h-4 w-4 shrink-0 text-[#d6b96c]" />
                  <span>คัดลอกลิงก์แล้ว</span>
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 shrink-0" />
                  <span>แชร์ลิงก์พอร์ทัล</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="top" className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-center px-4 sm:px-6 py-5 sm:py-6">
        {/* Compact Institutional Hero */}
        <section className="text-center pb-4">
          <p className="text-xs sm:text-[13px] font-semibold tracking-wide text-[#1c5b4e]">
            องค์การบริหารส่วนตำบลไร่ใต้ · อำเภอพิบูลมังสาหาร จังหวัดอุบลราชธานี
          </p>

          <h1 className="mx-auto mt-1 text-balance text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-[#123b35]">
            ศูนย์รวมระบบสารสนเทศ
          </h1>

          <p className="mx-auto mt-1 text-[clamp(0.75rem,2.1vw,0.95rem)] leading-normal text-[#52655f] whitespace-nowrap">
            ศูนย์กลางการเข้าถึงระบบปฏิบัติงานดิจิทัล กองช่าง องค์การบริหารส่วนตำบลไร่ใต้
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-3 h-0.5 w-14 rounded-full bg-[#d6b96c]"
          />
        </section>

        {/* Systems Section */}
        <section aria-labelledby="systems-heading" className="mt-1">
          <div className="border-b border-[#dce5e0] pb-2.5 text-center">
            <h2
              id="systems-heading"
              className="text-base sm:text-lg font-bold text-[#123b35]"
            >
              เลือกระบบที่ต้องการใช้งาน
            </h2>
          </div>

          {/* Systems 4-Column Single-Row Grid on Desktop */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTAL_SYSTEMS.map((sys) => (
              <SystemCard
                key={sys.id}
                system={sys}
                customUrl={sys.id === 'inventory' ? customInventoryUrl : null}
                isHighlighted={highlightedId === sys.id}
                onConfigurePendingLink={
                  sys.id === 'inventory' ? () => setIsModalOpen(true) : undefined
                }
              />
            ))}
          </div>
        </section>

        {/* Compact Institutional Notice */}
        <section
          aria-label="หมายเหตุและประกาศสถานะ"
          className="mt-4 rounded-xl border border-[#e7dec0] bg-[#fcfaf2] px-4 py-3"
        >
          <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-[13px] leading-relaxed text-[#5e512c]">
            <Info className="mt-0.5 sm:mt-0 h-4 w-4 shrink-0 text-[#8b6914]" aria-hidden="true" />
            <p>
              <strong className="font-bold text-[#3f3518]">หมายเหตุ:</strong>{' '}
              ศูนย์รวมลิงก์เข้าสู่ระบบสารสนเทศของ กองช่าง อบต.ไร่ใต้ ·{' '}
              ระบบสารบรรณ บริหารโครงการ และจัดซื้อจัดจ้าง พร้อมใช้งานแล้ว ส่วน{' '}
              <strong className="font-semibold text-[#3f3518]">ระบบคุมพัสดุ</strong>{' '}
              {customInventoryUrl
                ? 'กำลังใช้งานลิงก์ชั่วคราวที่บันทึกไว้ในเครื่องนี้'
                : 'อยู่ระหว่างรออัพเดตลิงก์เข้าใช้งานอย่างเป็นทางการ'}
            </p>
          </div>
        </section>
      </main>

      {/* Compact Footer */}
      <footer className="border-t border-[#dce5e0] bg-white/60 py-3.5 text-center text-xs text-[#5f726c]">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <p className="tabular-nums">
            © {currentYear} กองช่าง องค์การบริหารส่วนตำบลไร่ใต้
          </p>
          <p>ศูนย์รวมระบบสารสนเทศ · กองช่าง อบต.ไร่ใต้</p>
        </div>
      </footer>

      <PendingLinkModal
        isOpen={isModalOpen}
        currentUrl={customInventoryUrl}
        onClose={() => setIsModalOpen(false)}
        onSave={setCustomInventoryUrl}
      />
    </div>
  );
}
