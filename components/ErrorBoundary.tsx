'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  name: string
  children: ReactNode
  fallback?: ReactNode
}

type State = {
  hasError: boolean
}

export default class SectionErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn(`[LDS] ${this.props.name} recovered from a render error:`, error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <section
          aria-label={`${this.props.name} unavailable`}
          style={{
            background: 'var(--bg-secondary, #0E131A)',
            borderTop: '1px solid var(--line-soft, rgba(250,248,245,0.08))',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px',
          }}
        >
          <p className="t-body" style={{ color: 'var(--text-secondary, rgba(250,248,245,0.7))', textAlign: 'center' }}>
            This section could not be displayed. Please refresh to try again.
          </p>
        </section>
      )
    }

    return this.props.children
  }
}
