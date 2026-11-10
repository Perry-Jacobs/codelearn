import { useState } from 'react'

export function useCollapsibleRail() {
  const [collapsed, setCollapsed] = useState(false)

  return {
    collapsed,
    expanded: !collapsed,
    collapse: () => setCollapsed(true),
    expand: () => setCollapsed(false),
  }
}
