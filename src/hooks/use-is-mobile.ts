import { useEffect, useState } from 'react'

export function useIsMobile(defaultValue = false) {
  const [isMobile, setMobile] = useState(defaultValue)

  useEffect(() => {
    const userAgent =
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent

    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    )

    setMobile(mobile)
  }, [])

  return isMobile
}
