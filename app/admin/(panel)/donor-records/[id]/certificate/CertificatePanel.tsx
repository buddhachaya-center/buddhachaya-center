'use client'

import { useEffect, useRef, useState } from 'react'
import { toJpeg } from 'html-to-image'
import { fileNameFor } from '@/lib/certificate/format'
import {
  CertificateView,
  NODE_HEIGHT,
  NODE_WIDTH,
} from '@/components/certificate/CertificateView'

const MAX_PREVIEW_SCALE = 0.7
const PRINT_SCALE = 0.64

const PRINT_CSS = `
@media print {
  @page { size: A4; margin: 0; }
  html, body { margin: 0 !important; height: auto !important; }
  body * { visibility: hidden !important; }
  #certificate-print, #certificate-print * { visibility: visible !important; }
  #certificate-print {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 794px !important;
    height: 1123px !important;
    margin: 0 !important;
    overflow: hidden !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  #certificate-print [data-certificate-scaled] {
    transform: scale(${PRINT_SCALE}) !important;
  }
  .min-h-screen { min-height: 0 !important; }
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

export default function CertificatePanel({
  shares,
  currency,
  amount,
  name,
  remark,
  number,
  date,
}: {
  shares: string
  currency: string
  amount: number
  name: string
  remark: string
  number: number
  date: string
}) {
  const [previewScale, setPreviewScale] = useState(0.35)
  const [fontsReady, setFontsReady] = useState(false)
  const [canUseShare, setCanUseShare] = useState(false)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const [shareMessage, setShareMessage] = useState('')
  const [error, setError] = useState('')
  const previewRef = useRef<HTMLDivElement>(null)

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
      link.download = fileNameFor(number)
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
      const file = new File([blob], fileNameFor(number), { type: 'image/jpeg' })
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

      <div className="flex flex-wrap items-end gap-4 text-sm text-[#1E3F20]">
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

      <div ref={previewRef} className="w-full">
        <div
          id="certificate-print"
          data-certificate-box
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
              shares={shares}
              currency={currency}
              amount={amount}
              name={name}
              remark={remark}
              number={number}
              date={date}
              fontId="serif"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
