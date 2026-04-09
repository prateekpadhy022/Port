'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { markdown } from '@codemirror/lang-markdown'

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { ssr: false })

interface PostEditorProps {
  value: string
  onChange: (val: string) => void
}

export default function PostEditor({ value, onChange }: PostEditorProps) {
  const [preview, setPreview] = useState(false)

  return (
    <div className="editor-wrap">
      <div className="editor-tabs">
        <button
          className={`editor-tab${!preview ? ' active' : ''}`}
          onClick={() => setPreview(false)}
          type="button"
        >
          Write
        </button>
        <button
          className={`editor-tab${preview ? ' active' : ''}`}
          onClick={() => setPreview(true)}
          type="button"
        >
          Preview
        </button>
      </div>

      {preview ? (
        <div className="editor-preview prose">
          <p className="editor-preview-hint">Live preview — save to see full MDX render</p>
          <pre className="editor-preview-raw">{value}</pre>
        </div>
      ) : (
        <CodeMirror
          value={value}
          height="500px"
          extensions={[markdown()]}
          onChange={onChange}
          theme="dark"
          className="editor-codemirror"
          basicSetup={{
            lineNumbers: true,
            foldGutter: false,
            highlightActiveLine: true,
          }}
        />
      )}
    </div>
  )
}
