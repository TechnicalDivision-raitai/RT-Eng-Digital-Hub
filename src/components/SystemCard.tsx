import {
  ArrowUpRight,
  BookOpenText,
  Building2,
  CheckCircle2,
  Clock,
  Link2,
  PackageCheck,
  ShoppingBag,
} from 'lucide-react';
import type { PortalSystem, SystemId } from '../data/systems';

interface SystemCardProps {
  system: PortalSystem;
  customUrl?: string | null;
  isHighlighted?: boolean;
  onConfigurePendingLink?: () => void;
}

const SYSTEM_ICONS: Record<SystemId, typeof BookOpenText> = {
  saraban: BookOpenText,
  project: Building2,
  procurement: ShoppingBag,
  inventory: PackageCheck,
};

export function SystemCard({
  system,
  customUrl,
  isHighlighted = false,
  onConfigurePendingLink,
}: SystemCardProps) {
  const effectiveUrl = system.url ?? customUrl ?? null;
  const isActive = Boolean(effectiveUrl);
  const isCustomLocalOverride = !system.url && Boolean(customUrl);
  const Icon = SYSTEM_ICONS[system.id];

  return (
    <article
      id={`system-${system.id}`}
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border bg-white p-5 transition-all duration-200 ease-out hover:-translate-y-0.5 ${
        isHighlighted
          ? 'border-[#123b35] ring-2 ring-[#d6b96c]/60 shadow-[0_16px_36px_-14px_rgba(18,59,53,0.18)]'
          : 'border-[#dce5e0] shadow-[0_12px_28px_-14px_rgba(18,59,53,0.09)] hover:shadow-[0_18px_36px_-14px_rgba(18,59,53,0.14)]'
      }`}
    >
      {/* Top accent hairline bar */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: isActive ? system.accentHex : '#8d9b96' }}
      />

      <div>
        {/* Card header: icon + status */}
        <div className="flex items-center justify-between gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-[1.03]"
            style={{
              backgroundColor: isActive ? system.tintHex : '#eef2f0',
              color: isActive ? system.accentHex : '#4b5e58',
            }}
          >
            <Icon className="h-5 w-5" strokeWidth={1.9} />
          </div>

          <div
            className={`inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold whitespace-nowrap ${
              isActive ? 'text-[#1c6b4a]' : 'text-[#8b5e1a]'
            }`}
          >
            {isActive ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{isCustomLocalOverride ? 'ลิงก์ชั่วคราว' : 'พร้อมใช้งาน'}</span>
              </>
            ) : (
              <>
                <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>รออัพเดตลิงก์</span>
              </>
            )}
          </div>
        </div>

        {/* Unboxed editorial metadata */}
        <div className="mt-3.5 flex items-center gap-1.5 text-[11px] font-medium text-[#5f726c]">
          <span className="font-mono tabular-nums font-semibold text-[#123b35]">
            {system.indexLabel}
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tracking-wide text-[#758781]">{system.code}</span>
        </div>

        {/* Title & Description */}
        <h3 className="mt-1 text-lg font-bold leading-snug tracking-tight text-[#123b35]">
          {system.title}
        </h3>

        <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[#52655f]">
          {system.description}
        </p>

        {/* Functional Scope Metadata */}
        <div className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 border-t border-[#edf2ef] pt-2.5 text-[11.5px] text-[#647771]">
          {system.scopeItems.map((item, idx) => (
            <span key={item} className="inline-flex items-center gap-1.5">
              {idx > 0 && (
                <span aria-hidden="true" className="text-[#b8c6c0]">
                  ·
                </span>
              )}
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Footer action row */}
      <div className="mt-4 pt-1">
        {isActive && effectiveUrl ? (
          <div className="flex items-center gap-2">
            <a
              href={effectiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: system.accentHex }}
              className="inline-flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123b35] whitespace-nowrap shrink-0"
            >
              <span>{system.ctaLabel}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </a>

            {isCustomLocalOverride && onConfigurePendingLink && (
              <button
                type="button"
                onClick={onConfigurePendingLink}
                className="inline-flex min-h-[42px] shrink-0 items-center justify-center rounded-xl border border-[#d6e0db] bg-white px-3 py-2 text-xs font-semibold text-[#2c443d] transition-colors hover:bg-[#f2f6f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123b35] whitespace-nowrap"
              >
                แก้ไขลิงก์
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex min-h-[42px] w-full cursor-not-allowed items-center justify-center gap-1.5 rounded-xl bg-[#e4eae7] px-4 py-2 text-sm font-semibold text-[#5a6c66] whitespace-nowrap shrink-0"
            >
              <Clock className="h-4 w-4 shrink-0" />
              <span>อยู่ระหว่างรออัพเดตลิงก์</span>
            </button>

            {onConfigurePendingLink && (
              <button
                type="button"
                onClick={onConfigurePendingLink}
                className="inline-flex min-h-[36px] w-full items-center justify-center gap-1.5 rounded-lg border border-[#d6e0db] bg-[#fafcfb] px-3 py-1.5 text-xs font-semibold text-[#123b35] transition-colors hover:bg-[#eef4f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123b35] whitespace-nowrap shrink-0"
              >
                <Link2 className="h-3.5 w-3.5 shrink-0" />
                <span>ระบุลิงก์ชั่วคราว</span>
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
