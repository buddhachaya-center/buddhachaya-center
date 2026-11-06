const BERLIN = 'Europe/Berlin'

const partsFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: BERLIN,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
})

function berlinParts(instant: Date): Record<string, string> {
  const result: Record<string, string> = {}
  for (const part of partsFormatter.formatToParts(instant)) {
    if (part.type !== 'literal') result[part.type] = part.value
  }
  return result
}

function berlinOffsetMinutes(instant: Date): number {
  const parts = berlinParts(instant)
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  )
  return (asUtc - instant.getTime()) / 60000
}

function berlinWallClock(instant: Date): { date: string; time: string } {
  const parts = berlinParts(instant)
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
  }
}

export function utcToBerlin(iso: string): { date: string; time: string } {
  return berlinWallClock(new Date(iso))
}

export function berlinToUtc(date: string, time: string): Date | null {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(time)
  if (!dateMatch || !timeMatch) return null

  const y = Number(dateMatch[1])
  const m = Number(dateMatch[2])
  const d = Number(dateMatch[3])
  const h = Number(timeMatch[1])
  const min = Number(timeMatch[2])
  if (h > 23 || min > 59) return null

  const guess = Date.UTC(y, m - 1, d, h, min)
  if (isNaN(guess)) return null

  const dateCheck = new Date(guess)
  if (
    dateCheck.getUTCFullYear() !== y ||
    dateCheck.getUTCMonth() !== m - 1 ||
    dateCheck.getUTCDate() !== d
  ) {
    return null
  }

  let utc = guess - berlinOffsetMinutes(new Date(guess)) * 60000
  utc = guess - berlinOffsetMinutes(new Date(utc)) * 60000

  const result = new Date(utc)
  const back = berlinWallClock(result)
  if (back.date !== date || back.time !== time) return null

  return result
}

export function weekdayOfDate(date: string): number {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)
  if (!dateMatch) return 0
  return new Date(
    Date.UTC(Number(dateMatch[1]), Number(dateMatch[2]) - 1, Number(dateMatch[3])),
  ).getUTCDay()
}
