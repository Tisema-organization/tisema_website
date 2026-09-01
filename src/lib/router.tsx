import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'

export type AppRoute = 'landing' | 'gallery'

function normalizePath(pathname: string) {
  const path = pathname.replace(/\/$/, '') || '/'
  if (path.endsWith('/index.html') || path.endsWith('/index.htm')) return '/'
  return path
}

export function getAppRoute(pathname = window.location.pathname): AppRoute {
  const path = normalizePath(pathname)
  if (path === '/gallery' || path.endsWith('/gallery.html')) return 'gallery'
  return 'landing'
}

/** Same-origin navigations that swap views without reloading the document. */
export function shouldClientNavigate(href: string) {
  if (
    href.startsWith('http') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return false
  }

  try {
    const url = new URL(href, window.location.origin)
    if (url.origin !== window.location.origin) return false
    return normalizePath(url.pathname) !== normalizePath(window.location.pathname)
  } catch {
    return false
  }
}

type RouterContextValue = {
  route: AppRoute
  navigate: (href: string, options?: { replace?: boolean }) => void
}

const RouterContext = createContext<RouterContextValue | null>(null)

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<AppRoute>(() => getAppRoute())

  useEffect(() => {
    const onPopState = () => setRoute(getAppRoute())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback(
    (href: string, options?: { replace?: boolean }) => {
      const url = new URL(href, window.location.origin)
      const next = getAppRoute(url.pathname)
      const path = `${url.pathname}${url.search}${url.hash}`

      if (options?.replace) {
        history.replaceState(null, '', path)
      } else {
        history.pushState(null, '', path)
      }

      setRoute(next)

      if (next === 'gallery') {
        window.scrollTo(0, 0)
        return
      }

      if (url.hash && url.hash !== '#home') {
        requestAnimationFrame(() => {
          document.querySelector(url.hash)?.scrollIntoView()
        })
      }
    },
    [],
  )

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const ctx = useContext(RouterContext)
  if (!ctx) {
    throw new Error('useRouter must be used within RouterProvider')
  }
  return ctx
}

/** Intercept in-app links so gallery ↔ home never reloads the page. */
export function clientNavigate(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  navigate: (href: string, options?: { replace?: boolean }) => void,
) {
  if (event.defaultPrevented) return false
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return false
  }
  if (!shouldClientNavigate(href)) return false

  event.preventDefault()
  navigate(href)
  return true
}
