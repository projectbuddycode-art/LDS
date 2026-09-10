/**
 * Unified Quote Modal event dispatcher
 * Can be triggered from any page, CTA button, card, footer, or chatbot.
 */
export function openQuoteModal(projectType?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('open-lds-quote', {
        detail: { projectType },
      })
    )
  }
}
