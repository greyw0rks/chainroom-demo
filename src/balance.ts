/** Format a raw token balance without floating-point arithmetic. */
export function formatTokenBalance(raw: bigint, decimals: number): string {
  if (raw < 0n) throw new RangeError('Balance cannot be negative');
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 36) {
    throw new RangeError('Token decimals must be an integer from 0 to 36');
  }
  const precision = decimals;
  const scale = 10n ** BigInt(precision);
  const whole = raw / scale;
  const fraction = (raw % scale).toString().padStart(precision, '0').replace(/0+$/, '');
  return fraction ? `${whole}.${fraction}` : whole.toString();
}
