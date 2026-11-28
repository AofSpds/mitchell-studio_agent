import { readFile } from 'node:fs/promises';
import { fontPath } from './common.mjs';

export const style = Object.freeze({ fontSize: 48, lineSpacing: 14, border: 20, maxLines: 5, guard: 2 });
export class CaptionError extends Error {
  constructor(code, detail) { super(`${code}: ${detail}`); this.code = code; }
}
const ensure = (ok, code, detail) => { if (!ok) throw new CaptionError(code, detail); };
let cached;
export async function loadFont() {
  if (cached) return cached;
  const b = await readFile(fontPath), tables = new Map();
  for (let i = 0; i < b.readUInt16BE(4); i++) {
    const p = 12 + i * 16;
    tables.set(b.toString('ascii', p, p + 4), b.readUInt32BE(p + 8));
  }
  for (const t of ['head', 'hhea', 'maxp', 'hmtx', 'cmap', 'loca', 'glyf']) ensure(tables.has(t), 'FONT_TABLE', t);
  const head = tables.get('head'), hhea = tables.get('hhea');
  const scale = style.fontSize / b.readUInt16BE(head + 18);
  const count = b.readUInt16BE(tables.get('maxp') + 4), metricsCount = b.readUInt16BE(hhea + 34);
  const cmap = tables.get('cmap'), choices = [];
  for (let i = 0; i < b.readUInt16BE(cmap + 2); i++) {
    const p = cmap + 4 + i * 8, platform = b.readUInt16BE(p), encoding = b.readUInt16BE(p + 2);
    const offset = cmap + b.readUInt32BE(p + 4), format = b.readUInt16BE(offset);
    if ((platform === 0 || (platform === 3 && [1, 10].includes(encoding))) && [4, 12].includes(format)) choices.push({ offset, format });
  }
  choices.sort((a, z) => z.format - a.format);
  ensure(choices.length, 'FONT_CMAP', 'Unicode cmap required');
  const { offset: c, format } = choices[0];
  function glyph(cp) {
    if (format === 12) {
      let lo = 0, hi = b.readUInt32BE(c + 12) - 1;
      while (lo <= hi) {
        const mid = (lo + hi) >>> 1, p = c + 16 + mid * 12;
        const start = b.readUInt32BE(p), end = b.readUInt32BE(p + 4);
        if (cp < start) hi = mid - 1;
        else if (cp > end) lo = mid + 1;
        else return b.readUInt32BE(p + 8) + cp - start;
      }
      return 0;
    }
    if (cp > 0xffff) return 0;
    const n = b.readUInt16BE(c + 6) / 2;
    for (let i = 0; i < n; i++) {
      if (cp > b.readUInt16BE(c + 14 + i * 2)) continue;
      const start = b.readUInt16BE(c + 16 + n * 2 + i * 2);
      if (cp < start) return 0;
      const delta = b.readInt16BE(c + 16 + n * 4 + i * 2), rp = c + 16 + n * 6 + i * 2;
      const range = b.readUInt16BE(rp);
      if (!range) return (cp + delta) & 0xffff;
      const g = b.readUInt16BE(rp + range + (cp - start) * 2);
      return g ? (g + delta) & 0xffff : 0;
    }
    return 0;
  }
  const longLoca = b.readInt16BE(head + 50) === 1;
  const location = g => longLoca ? b.readUInt32BE(tables.get('loca') + g * 4) : b.readUInt16BE(tables.get('loca') + g * 2) * 2;
  function metric(char) {
    const g = glyph(char.codePointAt(0));
    ensure(g > 0 && g < count, 'FONT_GLYPH', `missing ${JSON.stringify(char)}`);
    const advance = b.readUInt16BE(tables.get('hmtx') + Math.min(g, metricsCount - 1) * 4) * scale;
    const start = location(g), end = location(g + 1), p = tables.get('glyf') + start;
    return { advance, xMin: start === end ? 0 : b.readInt16BE(p + 2) * scale, xMax: start === end ? 0 : b.readInt16BE(p + 6) * scale };
  }
  // Ceiling each advance plus ink overhang and a raster guard deliberately overestimates width.
  function width(text) {
    let pen = 0, left = 0, right = 0;
    for (const char of text) {
      const m = metric(char);
      left = Math.min(left, pen + Math.floor(m.xMin));
      right = Math.max(right, pen + Math.ceil(m.xMax));
      pen += Math.ceil(m.advance);
    }
    return Math.ceil(Math.max(pen, right) - left) + style.guard * 2;
  }
  const glyphHeight = (b.readInt16BE(head + 42) - b.readInt16BE(head + 38)) * scale;
  const fontHeight = (b.readInt16BE(hhea + 4) - b.readInt16BE(hhea + 6) + Math.max(0, b.readInt16BE(hhea + 8))) * scale;
  cached = { width, metric, lineHeight: Math.ceil(Math.max(glyphHeight, fontHeight)) + style.guard * 2, unitsPerEm: b.readUInt16BE(head + 18) };
  return cached;
}

export function wrapCaption(text, font, maxWidth) {
  ensure(Number.isFinite(maxWidth) && maxWidth > 0, 'CAPTION_WIDTH', 'positive available text width required');
  ensure(typeof text === 'string' && text.trim().length, 'CAPTION_EMPTY', 'caption required');
  ensure(!/[\p{M}\u200c\u200d\u1100-\u11ff]/u.test(text), 'CAPTION_SHAPING', 'use precomposed Korean; combining or joining sequences are unsupported');
  ensure(!/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/u.test(text), 'CAPTION_CONTROL', 'unsupported control');
  const lines = [], forcedBreaks = [];
  for (const paragraph of text.replace(/\r\n?/gu, '\n').split('\n')) {
    let line = '';
    const tokens = paragraph.trim().split(/\s+/u).filter(Boolean);
    if (!tokens.length) { lines.push(''); continue; }
    for (const token of tokens) {
      if (font.width(token) > maxWidth) {
        if (line) { lines.push(line); line = ''; }
        const pieces = [];
        let piece = '';
        for (const char of token) {
          ensure(font.width(char) <= maxWidth, 'CAPTION_GLYPH_TOO_WIDE', char);
          if (piece && font.width(piece + char) > maxWidth) { pieces.push(piece); piece = ''; }
          piece += char;
        }
        if (piece) pieces.push(piece);
        lines.push(...pieces.slice(0, -1));
        line = pieces.at(-1);
        forcedBreaks.push({ token, pieces, reason: 'single token wider than caption width', widthPx: font.width(token), maxWidth });
      } else if (!line) line = token;
      else if (font.width(`${line} ${token}`) <= maxWidth) line += ` ${token}`;
      else { lines.push(line); line = token; }
    }
    if (line) lines.push(line);
  }
  return { source: text, lines, wrapped: lines.join('\n'), widths: lines.map(line => font.width(line)), forcedBreaks };
}

export async function layoutCaptions(plan) {
  const a = plan.output.captionSafeArea;
  ensure(a && typeof a === 'object' && !Array.isArray(a), 'CAPTION_SAFE_AREA', 'four margins required');
  ensure(Object.keys(a).length === 4 && ['top', 'bottom', 'left', 'right'].every(k => Number.isSafeInteger(a[k]) && a[k] >= 0), 'CAPTION_SAFE_AREA', 'top/bottom/left/right must be nonnegative integer pixels');
  ensure(a.left + a.right < plan.output.width && a.top + a.bottom < plan.output.height, 'CAPTION_SAFE_AREA', 'empty safe rectangle');
  const font = await loadFont();
  const maxWidth = plan.output.width - a.left - a.right - 2 * style.border;
  ensure(maxWidth > 0, 'CAPTION_WIDTH', 'safe area narrower than caption box padding');
  return plan.scenes.map(scene => {
    const wrapped = wrapCaption(scene.caption, font, maxWidth);
    ensure(wrapped.lines.length <= style.maxLines, 'CAPTION_LINE_LIMIT', `${scene.sceneId}: ${wrapped.lines.length} > ${style.maxLines}; lines=${JSON.stringify(wrapped.lines)}`);
    const textWidth = Math.max(...wrapped.widths), textHeight = wrapped.lines.length * font.lineHeight + (wrapped.lines.length - 1) * style.lineSpacing;
    const centerX = (a.left + plan.output.width - a.right) / 2;
    const bottomText = a.bottom + style.border;
    const box = { left: centerX - textWidth / 2 - style.border, right: centerX + textWidth / 2 + style.border, top: plan.output.height - bottomText - textHeight - style.border, bottom: plan.output.height - a.bottom };
    ensure(box.left >= a.left && box.right <= plan.output.width - a.right && box.top >= a.top && box.bottom <= plan.output.height - a.bottom, 'CAPTION_OUTSIDE_SAFE_AREA', `${scene.sceneId}: box=${JSON.stringify(box)} margins=${JSON.stringify(a)}`);
    return { sceneId: scene.sceneId, ...wrapped, box, centerX, bottomText, maxWidth, conservativeTextHeight: textHeight };
  });
}
