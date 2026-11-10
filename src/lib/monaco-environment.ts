import EditorWorker from 'monaco-editor/editor/editor.worker?worker'
import HtmlWorker from 'monaco-editor/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/language/css/css.worker?worker'

const monacoEnvironment = {
  globalAPI: import.meta.env.DEV,
  getWorker(_workerId: string, label: string) {
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new HtmlWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new CssWorker()
    }
    return new EditorWorker()
  },
}

;(self as typeof self & { MonacoEnvironment: typeof monacoEnvironment }).MonacoEnvironment =
  monacoEnvironment
