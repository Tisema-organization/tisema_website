import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'

export type AppRoute = 'landing' | 'gallery' | 'terms'

function normalizePath(pathname: string) {
  const path = pathname.replace(/\/$/, '') || '/'
  if (path.endsWith('/index.html') || path.endsWith('/index.htm')) return '/'
  if (path.endsWith('/gallery.html')) return '/gallery'
  if (path.endsWith('/terms.html')) return '/terms'
  return path
}

function isSpaPath(pathname: string) {
  const path = normalizePath(pathname)
  return path === '/' || path === '/gallery' || path === '/terms'
}

export function getAppRoute(pathname = window.location.pathname): AppRoute {
  const path = normalizePath(pathname)
  if (path === '/gallery') return 'gallery'
  if (path === '/terms') return 'terms'
  return 'landing'
}

/** Same-origin navigations handled inside the SPA shell. */
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
    const targetPath = normalizePath(url.pathname)
    const currentPath = normalizePath(window.location.pathname)
    if (!isSpaPath(targetPath) || !isSpaPath(currentPath)) return false
    return targetPath !== currentPath
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

      if (next === 'gallery' || next === 'terms') {
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

/** Intercept in-app links so route changes never reload the page. */
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
