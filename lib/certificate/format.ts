export function toBurmeseDigits(input: string): string {
  return input.replace(/[0-9]/g, (digit) =>
    String.fromCharCode(0x1040 + digit.charCodeAt(0) - 0x30)
  )
}

export function formatAmount(amount: number): string {
  const hasDecimals = !Number.isInteger(amount)
  const fixed = Math.abs(amount).toFixed(hasDecimals ? 2 : 0)
  const [integerPart, decimalPart] = fixed.split('.')
  const grouped = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const signed = amount < 0 ? '-' : ''
  const formatted = `${signed}${grouped}${decimalPart ? `.${decimalPart}` : ''}`

  return toBurmeseDigits(formatted)
}

export function formatCertificateNo(n: number): string {
  return `No. ${toBurmeseDigits(String(n).padStart(4, '0'))}`
}

export function formatDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split('-')
  return toBurmeseDigits(`${day}.${month}.${year}`)
}

export function fileNameFor(n: number): string {
  return `certificate-${String(n).padStart(4, '0')}.jpg`
}
