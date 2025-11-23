"use client"

import { useEffect, useState } from "react"

type CountdownTimerProps = {
  endDate: string
  locale: string
}

export default function CountdownTimer({ endDate, locale }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(endDate).getTime()
      const now = new Date().getTime()
      const difference = end - now

      if (difference <= 0) {
        return null
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)
      
      if (!newTimeLeft) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  if (!timeLeft) {
    return null
  }

  const labels = locale === 'zh-TW' 
    ? { endsIn: '活動倒數', d: '天', h: '時', m: '分', s: '秒' }
    : { endsIn: 'Ends in', d: 'd', h: 'h', m: 'm', s: 's' }

  return (
    <span className="flex items-center gap-2 text-sm font-medium">
      <span>{labels.endsIn}:</span>
      {timeLeft.days > 0 && (
        <span>{timeLeft.days}{labels.d}</span>
      )}
      <span>{timeLeft.hours.toString().padStart(2, '0')}{labels.h}</span>
      <span>{timeLeft.minutes.toString().padStart(2, '0')}{labels.m}</span>
      <span>{timeLeft.seconds.toString().padStart(2, '0')}{labels.s}</span>
    </span>
  )
}
