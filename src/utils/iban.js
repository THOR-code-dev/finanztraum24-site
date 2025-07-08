// Simple IBAN format and checksum validator (MOD 97-10)
// Returns true if IBAN is structurally valid. Does NOT verify bank existence.
export function isValidIBAN(raw) {
  if (!raw) return false;
  const iban = raw.replace(/\s+/g, '').toUpperCase();
  // Basic length check (15-34 chars typical)
  if (iban.length < 15 || iban.length > 34) return false;

  // Move first 4 chars to the end
  const rearranged = iban.slice(4) + iban.slice(0, 4);

  // Replace letters with numbers (A=10, B=11, ..., Z=35)
  let numeric = '';
  for (const ch of rearranged) {
    const code = ch.charCodeAt(0);
    numeric += code >= 65 && code <= 90 ? (code - 55).toString() : ch; // 55 = 'A'.charCodeAt(0) - 10
  }

  // Perform mod 97 using chunking to avoid bigint handling
  let remainder = 0;
  for (let i = 0; i < numeric.length; i += 7) {
    const part = remainder + numeric.slice(i, i + 7);
    remainder = Number(part) % 97;
  }
  return remainder === 1;
}
