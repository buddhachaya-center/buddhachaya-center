'use client'

import type { CSSProperties, ReactNode } from 'react'
import {
  formatAmount,
  formatCertificateNo,
  formatDate,
  toBurmeseDigits,
} from '@/lib/certificate/format'

export const NODE_WIDTH = 1240
export const NODE_HEIGHT = 1754
export const WATERMARK_OPACITY = 0.1
export const TEXT_COLOR = '#1E3A5F'
const LATIN_NAME_FONT_SIZE = 46

const LAYOUT = {
  title1: { top: 20, bottom: 24, fontSize: 44, lineHeight: 1.15 },
  title2: { top: 24, bottom: 27.4, fontSize: 40, lineHeight: 1.15 },
  title3: { top: 29.4, bottom: 33, fontSize: 52, lineHeight: 1.05, fontWeight: 700 },
  dataLine: { top: 34, bottom: 38, fontSize: 34, lineHeight: 1.2 },
  donorName: { top: 38.5, bottom: 48.5, fontSize: 54, lineHeight: 1.8, fontWeight: 700 },
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

export const FONT_OPTIONS = [
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

export type FontId = (typeof FONT_OPTIONS)[number]['id']

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

export function CertificateView({ shares, currency, amount, name, remark, number, date, fontId }: { shares: string; currency: string; amount: number; name: string; remark: string; number: number; date: string; fontId: FontId }) {
  const font = FONT_OPTIONS.find((option) => option.id === fontId) ?? FONT_OPTIONS[0]
  const sharesText = shares.trim()
  const donorName = name.trim()
  const hasBurmese = /[\u1000-\u109F]/.test(donorName)
  const dataLine = sharesText
    ? `ကုသိုလ်ဝေစု ( ${toBurmeseDigits(sharesText)} ) စု၊ ${currency} ${formatAmount(amount)} အလှူရှင်`
    : `${currency} ${formatAmount(amount)} အလှူရှင်`

  return (
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
      <CertificateBlock
        block={{ ...LAYOUT.donorName, fontSize: hasBurmese ? LAYOUT.donorName.fontSize : LATIN_NAME_FONT_SIZE }}
        left="10%"
        right="10%"
      >
        {donorName}
      </CertificateBlock>
      {remark.trim() && <CertificateBlock block={LAYOUT.remark}>{remark}</CertificateBlock>}
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
        <span>{formatCertificateNo(number)}</span>
        <span>{formatDate(date)}</span>
      </div>
    </div>
  )
}
