'use client';

import React, { useState } from 'react';

const FEEDBACK_ENDPOINT = 'https://mail.lianu.com/api/feedback';

export default function ContactMessageForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Statutory Correction');
  const [stateCode, setStateCode] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || message.trim().length < 5) {
      setStatus('error');
      setFeedback('Please enter a valid email address and a message of at least 5 characters.');
      return;
    }

    setStatus('submitting');
    setFeedback('');
    try {
      const res = await fetch(FEEDBACK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site: 'tenantfig.com',
          name: name.trim(),
          email: email.trim(),
          subject: topic,
          state: stateCode.trim().toUpperCase(),
          lead_type: 'contact_message',
          message: message.trim(),
          page_url: typeof window !== 'undefined' ? window.location.href : 'https://tenantfig.com/contact/',
          _hp_website: honeypot
        })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus('success');
        setFeedback('Message received. Our statutory research desk will reply to your email.');
        setName('');
        setEmail('');
        setStateCode('');
        setMessage('');
      } else {
        setStatus('error');
        setFeedback(data.error || 'Unable to send message right now. Please email editorial@tenantfig.com.');
      }
    } catch {
      setStatus('error');
      setFeedback('Network error. Please try again or email editorial@tenantfig.com.');
    }
  };

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
      <div className="space-y-1">
        <div className="text-xs font-mono uppercase tracking-widest text-[#059669] font-bold">
          FIRST-PARTY DIRECT MESSAGE DESK
        </div>
        <h2 className="text-xl font-extrabold text-[#0f2747]">
          Send a Direct Message to TenantFig
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Submit a statutory update, calculator bug report, or digital kit inquiry directly through our first-party desk—no third-party forms.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="_hp_website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="tf-contact-name" className="block text-xs font-bold text-[#0f2747]">
              Your Name
            </label>
            <input
              id="tf-contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Rivera"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0f2747]"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="tf-contact-email" className="block text-xs font-bold text-[#0f2747]">
              Reply Email <span className="text-rose-600">*</span>
            </label>
            <input
              id="tf-contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0f2747]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="tf-contact-topic" className="block text-xs font-bold text-[#0f2747]">
              Inquiry Topic
            </label>
            <select
              id="tf-contact-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#0f2747]"
            >
              <option value="Statutory Correction">Statutory / Municipal Ordinance Correction</option>
              <option value="Digital Kit & Pass Support">Digital Kit / Matrix Pass Support</option>
              <option value="Calculator Bug Report">Calculator Edge Case / Bug Report</option>
              <option value="Press & Data Citation">Press / Dataset Citation</option>
              <option value="Privacy & GDPR/CCPA">Privacy / GDPR / CCPA Request</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="tf-contact-state" className="block text-xs font-bold text-[#0f2747]">
              State / Metro (Optional)
            </label>
            <input
              id="tf-contact-state"
              type="text"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              placeholder="e.g. CA, NY, TX"
              maxLength={24}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0f2747]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="tf-contact-message" className="block text-xs font-bold text-[#0f2747]">
            Message <span className="text-rose-600">*</span>
          </label>
          <textarea
            id="tf-contact-message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Include the state/city URL, statute citation, or Dodo order ID (never include SSNs or bank numbers)..."
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0f2747]"
          />
        </div>

        {feedback && (
          <div
            className={`rounded-xl px-4 py-3 text-xs font-semibold ${
              status === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {feedback}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500">
            Routed directly to our first-party desk · Zero third-party trackers.
          </span>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-6 py-3 rounded-xl bg-[#059669] hover:bg-emerald-600 disabled:opacity-60 text-white font-extrabold text-xs sm:text-sm cursor-pointer transition"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Direct Message →'}
          </button>
        </div>
      </form>
    </section>
  );
}
