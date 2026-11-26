'use client';

import React, { useState } from 'react';

export interface IcsDeadlineButtonProps {
  title: string;
  description: string;
  daysFromNow?: number;
  targetDate?: string | Date;
  url?: string;
  filename?: string;
  label?: string;
  className?: string;
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

function formatIcsDateLocal(d: Date): string {
  return `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}`;
}

function formatIcsTimestampUtc(d: Date): string {
  return `${d.getUTCFullYear()}${pad2(d.getUTCMonth() + 1)}${pad2(d.getUTCDate())}T${pad2(d.getUTCHours())}${pad2(d.getUTCMinutes())}${pad2(d.getUTCSeconds())}Z`;
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');
}

function foldIcsLine(line: string): string {
  const maxLen = 75;
  if (line.length <= maxLen) return line;
  const chunks: string[] = [line.slice(0, maxLen)];
  let idx = maxLen;
  while (idx < line.length) {
    chunks.push(' ' + line.slice(idx, idx + maxLen - 1));
    idx += maxLen - 1;
  }
  return chunks.join('\r\n');
}

function resolveTargetDate(daysFromNow?: number, targetDate?: string | Date): Date {
  if (targetDate instanceof Date && !Number.isNaN(targetDate.getTime())) {
    return new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  }
  if (typeof targetDate === 'string' && targetDate.trim()) {
    const parsed = new Date(targetDate);
    if (!Number.isNaN(parsed.getTime())) {
      return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
    }
  }
  const now = new Date();
  const offset = typeof daysFromNow === 'number' && Number.isFinite(daysFromNow) ? Math.round(daysFromNow) : 14;
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
}

export default function IcsDeadlineButton({
  title,
  description,
  daysFromNow,
  targetDate,
  url = 'https://tenantfig.com',
  filename,
  label = 'Export Statutory Deadline (.ics)',
  className = ''
}: IcsDeadlineButtonProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const start = resolveTargetDate(daysFromNow, targetDate);
    const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1);
    const now = new Date();

    const dtStamp = formatIcsTimestampUtc(now);
    const dtStart = formatIcsDateLocal(start);
    const dtEnd = formatIcsDateLocal(end);
    const uid = `tenantfig-${dtStart}-${Math.random().toString(36).slice(2, 10)}@tenantfig.com`;

    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//TenantFig//Statutory Deadline Engine 2026//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART;VALUE=DATE:${dtStart}`,
      `DTEND;VALUE=DATE:${dtEnd}`,
      foldIcsLine(`SUMMARY:${escapeIcsText(title)}`),
      foldIcsLine(`DESCRIPTION:${escapeIcsText(description)}`),
      foldIcsLine(`URL:${url}`),
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      foldIcsLine(`DESCRIPTION:1-Day Statutory Reminder: ${escapeIcsText(title)}`),
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ];

    const icsContent = lines.join('\r\n') + '\r\n';
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);

    const safeName =
      filename ||
      `${title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 48) || 'statutory-deadline'}.ics`;

    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = safeName.endsWith('.ics') ? safeName : `${safeName}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={
        className ||
        'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#09192e] hover:bg-[#1a3b68] text-[#e2be68] border border-[#c8a24a]/50 text-xs font-bold transition cursor-pointer shadow-sm'
      }
    >
      <svg
        className="w-4 h-4 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span>{downloaded ? '✓ Downloaded .ics Calendar Event' : label}</span>
    </button>
  );
}
