import { useEffect } from 'react'

const BASE_TITLE = 'CodeLearn — Learn HTML one tag at a time'

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · CodeLearn` : BASE_TITLE
  }, [title])
}
