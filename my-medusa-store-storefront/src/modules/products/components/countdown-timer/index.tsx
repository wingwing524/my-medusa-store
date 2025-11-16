"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

interface CountdownTimerProps {
  endDate: Date | string
  onExpire?: () => void
}

export default function CountdownTimer({ endDate, onExpire }: CountdownTimerProps) {
  const t = useTranslations('common')
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = +new Date(endDate) - +new Date()
    
    if (difference > 0) {
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference,
      }
    }
    
    return { hours: 0, minutes: 0, seconds: 0, total: 0 }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)
      
      if (newTimeLeft.total <= 0) {
        clearInterval(timer)
        onExpire?.()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate, onExpire])

  if (timeLeft.total <= 0) {
    return null
  }

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg">
      <span className="text-sm font-medium text-gray-700">⏰ {t('saleEndsIn')}:</span>
      <div className="flex items-center gap-1 font-mono font-bold text-red-600">
        <span className="bg-white px-2 py-1 rounded border border-red-200 min-w-[2.5rem] text-center">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span>:</span>
        <span className="bg-white px-2 py-1 rounded border border-red-200 min-w-[2.5rem] text-center">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span>:</span>
        <span className="bg-white px-2 py-1 rounded border border-red-200 min-w-[2.5rem] text-center">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}
