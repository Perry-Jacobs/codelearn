import '../lib/monaco-environment'
import { Editor, loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor/editor/editor.api.js'
import 'monaco-editor/languages/definitions/html/register.js'
import 'monaco-editor/language/html/monaco.contribution.js'
import 'monaco-editor/languages/definitions/css/register.js'
import 'monaco-editor/language/css/monaco.contribution.js'
import type { editor } from 'monaco-editor'

loader.config({ monaco })

const editorOptions: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  lineNumbers: 'off',
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 0,
  glyphMargin: false,
  folding: false,
  renderLineHighlight: 'none',
  overviewRulerLanes: 0,
  hideCursorInOverviewRuler: true,
  overviewRulerBorder: false,
  scrollBeyondLastLine: false,
  wordWrap: 'on',
  fontSize: 13,
  lineHeight: 22,
  tabSize: 2,
  padding: { top: 12, bottom: 12 },
  automaticLayout: true,
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  scrollbar: {
    vertical: 'auto',
    horizontal: 'auto',
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8,
    useShadows: false,
  },
  suggestOnTriggerCharacters: false,
  quickSuggestions: false,
  wordBasedSuggestions: 'off',
  snippetSuggestions: 'none',
  acceptSuggestionOnEnter: 'off',
  tabCompletion: 'off',
  autoClosingBrackets: 'never',
  autoClosingQuotes: 'never',
  autoSurround: 'never',
  autoIndent: 'none',
  formatOnType: false,
  formatOnPaste: false,
  suggest: { showWords: false },
}

export function MonacoCodeEditor({
  value,
  onChange,
  height = '220px',
}: {
  value: string
  onChange: (value: string) => void
  height?: string
}) {
  return (
    <Editor
      height={height}
      language="html"
      value={value}
      onChange={(next) => onChange(next ?? '')}
      theme="codelearn-dark"
      beforeMount={(instance) => {
        instance.editor.defineTheme('codelearn-dark', {
          base: 'vs-dark',
          inherit: true,
          rules: [
            { token: 'comment', foreground: '71717a', fontStyle: 'italic' },
            { token: 'tag', foreground: '7dd3fc' },
            { token: 'attribute.name', foreground: 'fbbf24' },
            { token: 'attribute.value', foreground: '86efac' },
            { token: 'tag.css', foreground: 'f9a8d4' },
            { token: 'attribute.name.css', foreground: 'fbbf24' },
            { token: 'attribute.value.css', foreground: '86efac' },
            { token: 'attribute.value.number.css', foreground: 'fbbf24' },
            { token: 'attribute.value.unit.css', foreground: 'fbbf24' },
            { token: 'attribute.value.hex.css', foreground: 'fbbf24' },
            { token: 'keyword.css', foreground: 'c084fc' },
            { token: 'string.css', foreground: '86efac' },
            { token: 'comment.css', foreground: '71717a', fontStyle: 'italic' },
            { token: 'delimiter.css', foreground: 'a1a1aa' },
          ],
          colors: {
            'editor.background': '#09090b',
            'editor.foreground': '#e4e4e7',
            'editorLineNumber.foreground': '#3f3f46',
            'editorLineNumber.activeForeground': '#a1a1aa',
            'editorCursor.foreground': '#38bdf8',
            'editor.selectionBackground': '#0ea5e933',
            'editor.inactiveSelectionBackground': '#0ea5e91a',
            'editorIndentGuide.background1': '#27272a',
            'editorIndentGuide.activeBackground1': '#3f3f46',
            'editor.lineHighlightBackground': '#18181b',
          },
        })
      }}
      loading={
        <div className="flex h-full items-center justify-center text-xs text-zinc-500">
          Loading editor…
        </div>
      }
      options={editorOptions}
    />
  )
}
