'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { toJpeg } from 'html-to-image'
import {
  fileNameFor,
  formatAmount,
  formatCertificateNo,
  formatDate,
  toBurmeseDigits,
} from '@/lib/certificate/format'

const NODE_WIDTH = 1240
const NODE_HEIGHT = 1754
const MAX_PREVIEW_SCALE = 0.7
const PRINT_SCALE = 0.64
const WATERMARK_OPACITY = 0.1
const TEXT_COLOR = '#1E3A5F'

const LAYOUT = {
  title1: { top: 20, bottom: 24, fontSize: 44, lineHeight: 1.15 },
  title2: { top: 24, bottom: 27.4, fontSize: 40, lineHeight: 1.15 },
  title3: { top: 29.4, bottom: 33, fontSize: 52, lineHeight: 1.05, fontWeight: 700 },
  dataLine: { top: 34, bottom: 38, fontSize: 34, lineHeight: 1.2 },
  donorName: { top: 39.5, bottom: 47.5, fontSize: 54, lineHeight: 1.12, fontWeight: 700 },
  remark: { top: 47.5, bottom: 51, fontSize: 28, lineHeight: 1.2 },
  body: { top: 51, bottom: 62, fontSize: 25, lineHeight: 1.9 },
  blessings: { top: 63.4, bottom: 70.4, fontSize: 27, lineHeight: 1.35 },
  signature: { top: 74.3, bottom: 82.3, fontSize: 25, lineHeight: 1.5 },
  footer: { top: 82.5, bottom: 84.5, fontSize: 22, lineHeight: 1.2 },
} satisfies Record<string, {
  top: number
  bottom: number
  fontSize: number
  lineHeight: number
  fontWeight?: number
}>

type Preset = {
  id: string
  label: string
  shares: string
  currency: string
  amount: number
  name: string
  remark: string
  number: number
  date: string
}

const PRESETS: Preset[] = [
  {
    id: 'normal',
    label: 'Normal',
    shares: '1',
    currency: 'EUR',
    amount: 300,
    name: 'ဦးအောင်သူ နှင့် ဒေါ်မာမာအောင်',
    remark: '',
    number: 42,
    date: '2026-11-07',
  },
  {
    id: 'long-name',
    label: 'Long name',
    shares: '2',
    currency: 'EUR',
    amount: 600,
    name: 'ဦးသူရိယအောင်ကျော်ဇော နှင့် ဒေါ်ခင်မေသန့်စင်ဝင်း မိသားစုများ',
    remark: '',
    number: 42,
    date: '2026-11-07',
  },
  {
    id: 'long-remark',
    label: 'Long remark, 3-digit shares',
    shares: '120',
    currency: 'USD',
    amount: 36000,
    name: 'ဒေါ်မြမြစိုး',
    remark: 'မိဘများအတွက် ကုသိုလ်ပြုလှူဒါန်းသည်။ မိသားစုအားလုံး ကျန်းမာချမ်းသာစေရန် ရည်စူး၍ လှူဒါန်းပါသည်။',
    number: 42,
    date: '2026-11-07',
  },
  {
    id: 'latin-name',
    label: 'Latin name',
    shares: '1',
    currency: 'EUR',
    amount: 150.5,
    name: 'Maximilian Mustermann-Schneider',
    remark: '',
    number: 42,
    date: '2026-11-07',
  },
]

const FONT_OPTIONS = [
  {
    id: 'serif',
    label: 'Noto Serif Myanmar',
    family: 'var(--font-noto-serif-myanmar), serif',
  },
  {
    id: 'sans',
    label: 'Noto Sans Myanmar',
    family: 'var(--font-noto-sans-myanmar), sans-serif',
  },
] as const

type FontId = (typeof FONT_OPTIONS)[number]['id']

const PRINT_CSS = `
@media print {
  @page { size: A4; margin: 0; }
  body > div > div:first-child { display: none !important; }
  [data-certificate-controls] { display: none !important; }
  [data-certificate-preview],
  [data-certificate-preview-box],
  [data-certificate-scaled] { display: contents !important; }
  #certificate-node {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: ${NODE_WIDTH}px !important;
    height: ${NODE_HEIGHT}px !important;
    transform: scale(${PRINT_SCALE}) !important;
    transform-origin: top left !important;
  }
}
`

function blockStyle(block: {
  top: number
  bottom: number
  fontSize: number
  lineHeight: number
  fontWeight?: number
}, edges?: { left?: string; right?: string }): CSSProperties {
  return {
    position: 'absolute',
    left: edges?.left ?? '14%',
    right: edges?.right ?? '14%',
    top: `${block.top}%`,
    height: `${block.bottom - block.top}%`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: TEXT_COLOR,
    fontSize: block.fontSize,
    lineHeight: block.lineHeight,
    fontWeight: block.fontWeight ?? 400,
    zIndex: 2,
  }
}

function CertificateBlock({ block, left, right, children }: { block: typeof LAYOUT[keyof typeof LAYOUT]; left?: string; right?: string; children: ReactNode }) {
  return (
    <div style={blockStyle(block, { left, right })}>
      <div
        style={{
          width: '100%',
          overflowWrap: 'anywhere',
          wordBreak: 'break-word',
          lineBreak: 'auto',
          whiteSpace: 'pre-line',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function errorMessage(value: unknown): string {
  if (value instanceof Error) return value.message
  if (typeof value === 'object' && value !== null && 'message' in value) {
    return String((value as { message: unknown }).message)
  }
  return 'Export failed.'
}

function isAbortError(value: unknown): boolean {
  return typeof value === 'object' && value !== null && 'name' in value &&
    (value as { name: unknown }).name === 'AbortError'
}

export default function CertificatePrototype() {
  const [presetIndex, setPresetIndex] = useState(0)
  const [fontId, setFontId] = useState<FontId>('serif')
  const [previewScale, setPreviewScale] = useState(0.35)
  const [fontsReady, setFontsReady] = useState(false)
  const [canUseShare, setCanUseShare] = useState(false)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const [shareMessage, setShareMessage] = useState('')
  const [error, setError] = useState('')
  const previewRef = useRef<HTMLDivElement>(null)

  const preset = PRESETS[presetIndex] ?? PRESETS[0]
  const font = FONT_OPTIONS.find((option) => option.id === fontId) ?? FONT_OPTIONS[0]
  const sharesText = preset.shares.trim()
  const dataLine = sharesText
    ? `ကုသိုလ်ဝေစု ( ${toBurmeseDigits(sharesText)} ) စု၊ ${preset.currency} ${formatAmount(preset.amount)} အလှူရှင်`
    : `${preset.currency} ${formatAmount(preset.amount)} အလှူရှင်`

  useEffect(() => {
    const element = previewRef.current
    if (!element) return

    const updateScale = () => {
      const width = element.clientWidth
      if (width > 0) {
        setPreviewScale(Math.min(MAX_PREVIEW_SCALE, width / NODE_WIDTH))
      }
    }

    updateScale()
    const observer = new ResizeObserver(updateScale)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setCanUseShare(typeof navigator.share === 'function')
  }, [])

  useEffect(() => {
    let active = true
    document.fonts.ready
      .then(() => {
        if (active) setFontsReady(true)
      })
      .catch(() => {
        if (active) setFontsReady(false)
      })
    return () => {
      active = false
    }
  }, [])

  const ensureFontsReady = async () => {
    await document.fonts.ready
    setFontsReady(true)
  }

  const createCertificateJpeg = async () => {
    await ensureFontsReady()
    const node = document.getElementById('certificate-node')
    if (!node) throw new Error('Certificate preview is not ready.')

    return await toJpeg(node, {
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      quality: 0.92,
      backgroundColor: '#FFFDF5',
      cacheBust: true,
      style: { transform: 'none' },
      pixelRatio: window.matchMedia('(pointer: coarse)').matches ? 1 : 2,
    })
  }

  const reportExport = async (dataUrl: string) => {
    const image = new Image()
    image.src = dataUrl
    await image.decode()

    const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1)
    const binary = atob(base64)
    const kb = Math.round(binary.length / 1024)
    setStatus(`Exported: ${image.naturalWidth} x ${image.naturalHeight} px, ${kb} KB`)
  }

  const handleDownload = async () => {
    if (busy) return
    setBusy(true)
    setError('')
    setStatus('')
    try {
      const dataUrl = await createCertificateJpeg()
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = fileNameFor(preset.number)
      document.body.appendChild(link)
      link.click()
      link.remove()
      await reportExport(dataUrl)
    } catch (value) {
      setError(errorMessage(value))
    } finally {
      setBusy(false)
    }
  }

  const handleShare = async () => {
    if (busy || !canUseShare) return
    setBusy(true)
    setError('')
    setStatus('')
    setShareMessage('')
    try {
      const dataUrl = await createCertificateJpeg()
      const blob = await (await fetch(dataUrl)).blob()
      const file = new File([blob], fileNameFor(preset.number), { type: 'image/jpeg' })
      await reportExport(dataUrl)

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] })
      } else {
        setShareMessage('Sharing files is not supported here. Use Download.')
      }
    } catch (value) {
      if (!isAbortError(value)) {
        setError(errorMessage(value))
      }
    } finally {
      setBusy(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-4">
      <style>{PRINT_CSS}</style>

      <div data-certificate-controls className="flex flex-wrap items-end gap-4 text-sm text-[#1E3F20]">
        <label className="flex flex-col gap-1">
          Preset
          <select
            value={presetIndex}
            onChange={(event) => setPresetIndex(Number(event.target.value))}
            className="border px-3 py-2"
          >
            {PRESETS.map((item, index) => (
              <option key={item.id} value={index}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          Font
          <select
            value={fontId}
            onChange={(event) => setFontId(event.target.value as FontId)}
            className="border px-3 py-2"
          >
            {FONT_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleDownload}
            disabled={busy}
            className="bg-[#1E3F20] text-white py-2 px-4 hover:bg-[#163318] disabled:opacity-60"
          >
            Download JPEG
          </button>
          <button
            type="button"
            onClick={handlePrint}
            disabled={busy}
            className="border border-[#1E3F20] py-2 px-4 hover:bg-[#1E3F20]/10 disabled:opacity-60"
          >
            Print / Save as PDF
          </button>
          {canUseShare && (
            <button
              type="button"
              onClick={handleShare}
              disabled={busy}
              className="border border-[#1E3F20] py-2 px-4 hover:bg-[#1E3F20]/10 disabled:opacity-60"
            >
              Share
            </button>
          )}
        </div>

        <p className="w-full text-xs">Fonts ready: {fontsReady ? 'yes' : 'no'}</p>
        {status && <p className="w-full text-sm">{status}</p>}
        {shareMessage && <p className="w-full text-sm">{shareMessage}</p>}
        {error && <p className="w-full text-sm text-red-700">{error}</p>}
      </div>

      <div ref={previewRef} data-certificate-preview className="w-full">
        <div
          data-certificate-preview-box
          className="relative mx-auto"
          style={{ width: NODE_WIDTH * previewScale, height: NODE_HEIGHT * previewScale }}
        >
          <div
            data-certificate-scaled
            className="absolute left-0 top-0"
            style={{
              width: NODE_WIDTH,
              height: NODE_HEIGHT,
              transform: `scale(${previewScale})`,
              transformOrigin: 'top left',
            }}
          >
            <div
              id="certificate-node"
              style={{
                position: 'relative',
                width: NODE_WIDTH,
                height: NODE_HEIGHT,
                overflow: 'hidden',
                backgroundColor: '#FFFDF5',
                color: TEXT_COLOR,
                fontFamily: font.family,
              }}
            >
              <img
                src="/certificate/frame.jpg"
                alt=""
                draggable={false}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />
              <img
                src="/certificate/logo.png"
                alt=""
                draggable={false}
                style={{
                  position: 'absolute',
                  left: '27%',
                  top: '57%',
                  width: '46%',
                  height: '32.5%',
                  objectFit: 'contain',
                  opacity: WATERMARK_OPACITY,
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />

              <CertificateBlock block={LAYOUT.title1}>ဂျာမနီမြန်မာကျောင်း</CertificateBlock>
              <CertificateBlock block={LAYOUT.title2}>ဝိဟာရဒါန ကျောင်းအလှူ</CertificateBlock>
              <CertificateBlock block={LAYOUT.title3}>သာဓုအနုမောဒနာ ဂုဏ်ပြုလွှာ</CertificateBlock>
              <CertificateBlock block={LAYOUT.dataLine}>{dataLine}</CertificateBlock>
              <CertificateBlock block={LAYOUT.donorName}>{preset.name}</CertificateBlock>
              {preset.remark.trim() && <CertificateBlock block={LAYOUT.remark}>{preset.remark}</CertificateBlock>}
              <CertificateBlock block={LAYOUT.body}>
                ဂျာမနီနိုင်ငံရောက် မြန်မာပြည်ဖွား ဗုဒ္ဓဘာသာဝင်များနှင့် တရားဘာသာ အားထုတ်လိုသူ နိုင်ငံခြားသားများအတွက် ကုသိုလ်ကောင်းမှုများ ဆည်းပူးအားထုတ်ရာ မြန်မာဗုဒ္ဓဘာသာဘုန်းကြီးကျောင်း ဖြစ်မြောက်ရေးအတွက် စေတနာသုံးတန် ပြဋ္ဌာန်းပြီး လှူဒါန်းကြသည့်အတွက် ဝမ်းမြောက်ဝမ်းသာဖြင့် ဤမှတ်တမ်းဂုဏ်ပြုလွှာကို ပေးအပ်ပါသည်။
              </CertificateBlock>
              <CertificateBlock block={LAYOUT.blessings}>
                {`နတ်လူသာဓု ခေါ်စေသော် .....
စိတ်ထားဖွေးလတ် သူတော်ကောင်းဓါတ် လွှမ်းပတ်ကမ္ဘာမှာ တည်ပါစေ ...
လောကီ၊ လောကုတ္တရာ အကျိုးစီးပွားများလည်း ဖြစ်ထွန်းအောင်မြင်ကြပါစေ ...`}
              </CertificateBlock>
              <CertificateBlock block={LAYOUT.signature} left="50%" right="14%">
                {`ဆရာတော် အရှင်ကုသလသာမိ
ဂျာမနီမြန်မာကျောင်း
ဂျာမနီနိုင်ငံ`}
              </CertificateBlock>

              <div
                style={{
                  position: 'absolute',
                  left: '14%',
                  right: '14%',
                  top: `${LAYOUT.footer.top}%`,
                  height: `${LAYOUT.footer.bottom - LAYOUT.footer.top}%`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: TEXT_COLOR,
                  fontSize: LAYOUT.footer.fontSize,
                  lineHeight: LAYOUT.footer.lineHeight,
                  zIndex: 2,
                }}
              >
                <span>{formatCertificateNo(preset.number)}</span>
                <span>{formatDate(preset.date)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
