import { useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { copy as t, vendors, type Language } from "@/data/portfolioData";

function subscribeLanguage(callback: () => void) {
  document.addEventListener("portfolio:language", callback);
  return () => document.removeEventListener("portfolio:language", callback);
}

function getLanguage(): Language {
  return document.documentElement.lang === "id" ? "id" : "en";
}

export default function CliTerminalPreview() {
  const lang = useSyncExternalStore(subscribeLanguage, getLanguage, (): Language => "en");
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const vendor = vendors[active];
  const select = (index: number) => { setActive(index); setStatus("idle"); };
  const keyboard = (event: KeyboardEvent, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % vendors.length;
    else if (event.key === "ArrowLeft") next = (index + vendors.length - 1) % vendors.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = vendors.length - 1;
    else return;
    event.preventDefault(); select(next); tabs.current[next]?.focus();
  };
  const copyCommands = async () => { try { await navigator.clipboard.writeText(vendor.commands.map(c => c.command).join("\n")); setStatus("copied"); } catch { setStatus("failed"); } };
  return <div className="terminal-section"><div className="terminal-section-heading"><span className="micro">{t.telemetry[lang]}</span><span className="micro muted">SECURECRT / SSH</span></div><div className="terminal">
    <div className="terminal-top"><div className="terminal-dots" aria-hidden="true"><i /><i /><i /></div><span className="micro"><Terminal size={12} />{t.diagnostics[lang]}</span><span className="micro terminal-session">{t.sample[lang]}</span></div>
    <div className="vendor-controls"><div className="vendor-tabs" role="tablist" aria-label={t.telemetry[lang]}>{vendors.map((item, i) => <button type="button" key={item.name} role="tab" id={`vendor-tab-${i}`} aria-controls="vendor-panel" aria-selected={i === active} tabIndex={i === active ? 0 : -1} onClick={() => select(i)} onKeyDown={e => keyboard(e, i)} ref={el => { tabs.current[i] = el; }}>{item.name}<span className="tab-dot" /></button>)}</div><button type="button" className="copy-button" onClick={copyCommands} aria-label={status === "copied" ? t.copied[lang] : t.copy[lang]}>{status === "copied" ? <Check size={14} /> : <Copy size={14} />}</button></div>
    <div className="terminal-body" role="tabpanel" tabIndex={0} id="vendor-panel" aria-labelledby={`vendor-tab-${active}`}><div className="terminal-system"># {vendor.system} / {t.sample[lang]}</div>{vendor.commands.map((item, i) => <div className="command-group" key={`${active}-${i}`}><p className="command-comment"># 0{i + 1} — {item.label[lang]}</p>{item.command.split("\n").map(command => <div className="command-line" key={command}><span className="terminal-prompt">{vendor.prompt}</span><code>{command}</code></div>)}</div>)}<div className="terminal-cursor" aria-hidden="true"><span className="terminal-prompt">{vendor.prompt}</span><i /></div></div>
    <div className="terminal-bottom"><span className="micro"><i className="status-dot" />{vendor.system}</span><span className="micro">UTF-8 · SSH2</span></div></div><p className="terminal-hint">{t.terminalHint[lang]}</p><span role="status" className="copy-status">{status === "copied" ? t.copied[lang] : status === "failed" ? t.copyFailed[lang] : ""}</span></div>;
}
