'use client'

import '@contentstack/live-preview-utils/dist/main.css'

import { useEffect } from 'react'
import initialize from './initialize'

export default function LivePreviewInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initialize()
  }, [])

  return children
}
