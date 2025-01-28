import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Play, Pause, Volume2, VolumeX, Trophy } from 'lucide-react'

function App() {
  const [isPWA, setIsPWA] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isMuted, setIsMuted] = useState(false)
  const [currentCharacter, setCurrentCharacter] = useState(0)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsPWA(true)
    }
  }, [])

  useEffect(() => {
    let timer: number
    if (isPlaying && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isPlaying, timeLeft])

  const characters = [
    '🐱', '🐰', '🐼', '🦊', '🐨', '🐯',
    '🦁', '🐸', '🐷', '🐮', '🐻', '🐙'
  ]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100

  return (
    <div className="min-h-screen bg-[#FFF8F0] p-4">
      <Toaster />
      
      <div className="max-w-md mx-auto">
        <motion.div
          className="text-center mb-8 text-6xl"
          animate={{ scale: isPlaying ? 1.1 : 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          {characters[currentCharacter]}
        </motion.div>

        <div className="relative w-64 h-64 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              className="text-[#E2D9F3]"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
              r="120"
              cx="128"
              cy="128"
            />
            <circle
              className="text-[#6B4F89]"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
              r="120"
              cx="128"
              cy="128"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-4xl font-bold text-[#6B4F89]">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={togglePlay}
            className="p-4 rounded-full bg-[#FFD6E0] hover:bg-[#FFB6C1] transition-colors"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={toggleMute}
            className="p-4 rounded-full bg-[#C3E6CB] hover:bg-[#A3D6AB] transition-colors"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Trophy size={20} className="text-[#6B4F89]" />
              <span className="font-medium">Daily Streak</span>
            </div>
            <span className="text-lg font-bold text-[#6B4F89]">{streak}</span>
          </div>
          <div className="h-2 bg-[#E2D9F3] rounded-full">
            <motion.div
              className="h-full bg-[#6B4F89] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(streak / 7) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence>
          {timeLeft === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              onClick={() => {
                setTimeLeft(25 * 60)
                setStreak(s => s + 1)
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 }
                })
              }}
            >
              <div className="bg-white p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Great job!</h2>
                <p className="text-gray-600">
                  You've completed your study session!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
