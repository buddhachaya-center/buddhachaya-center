'use client'

import { useEffect, useRef, useState } from 'react'
import { toJpeg } from 'html-to-image'
import {
  fileNameFor,
} from '@/lib/certificate/format'
import {
  CertificateView,
  FONT_OPTIONS,
  NODE_HEIGHT,
  NODE_WIDTH,
  type FontId,
} from '@/components/certificate/CertificateView'

const MAX_PREVIEW_SCALE = 0.7
const PRINT_SCALE = 0.64

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
  const [name, setName] = useState(PRESETS[0]?.name ?? '')
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
            onChange={(event) => {
              const index = Number(event.target.value)
              setPresetIndex(index)
              setName(PRESETS[index]?.name ?? '')
            }}
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

        <label className="flex flex-col gap-1">
          Donor name (Enter = new line, max 2 lines)
          <textarea
            value={name}
            rows={2}
            maxLength={120}
            onChange={(event) => setName(event.target.value.split('\n').slice(0, 2).join('\n'))}
            className="border px-3 py-2 w-80"
          />
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
            <CertificateView
              shares={preset.shares}
              currency={preset.currency}
              amount={preset.amount}
              name={name}
              remark={preset.remark}
              number={preset.number}
              date={preset.date}
              fontId={fontId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
