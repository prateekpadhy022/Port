'use client'

import { useState, useRef, DragEvent } from 'react'

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const upload = async (file: File) => {
    setUploading(true)
    setError('')
    const form = new FormData()
    form.append('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Upload failed')
      onChange(json.url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) upload(file)
  }

  return (
    <div className="image-uploader">
      {value ? (
        <div className="image-uploader-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Thumbnail preview" />
          <button type="button" className="btn btn-secondary" onClick={() => onChange('')}>
            Remove
          </button>
        </div>
      ) : (
        <div
          className={`image-uploader-drop${dragging ? ' dragging' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f) }}
          />
          {uploading ? (
            <span>Uploading…</span>
          ) : (
            <span>Drag &amp; drop or click to upload thumbnail</span>
          )}
        </div>
      )}
      {error && <p className="image-uploader-error">{error}</p>}
    </div>
  )
}
