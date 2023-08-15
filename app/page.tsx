"use client"
import { useState, useRef } from 'react'
import EqualizerSVG from '@/app/equalizer'
import StillWorth from "@/public/assets/music/Swf.mp3"
import Header from '@/components/Header'
import { AudioMeta } from '@/types'
import Article from '@/components/Article'

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`
}

export default function Home() {
  const audioPlayer = useRef<HTMLAudioElement | null>(null)
  const seekBarHandle = useRef<HTMLDivElement | null>(null)
  const seekBar = useRef<HTMLDivElement | null>(null)
  const wasPlaying = useRef(false)
  const [audioSrc,setAudioSrc] = useState("")
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [showAudioPlayer, setShowAudioPlayer] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [metadata, setMetadata] = useState<AudioMeta>({})
  const handleTimeUpdate = () => {
    if (!audioPlayer?.current) return
    setCurrentTime(audioPlayer.current.currentTime)
  }

  const playAudio = async () => {
    if (!audioPlayer?.current) return
    if (audioPlayer.current.currentTime === audioPlayer.current.duration) {
      setCurrentTime(0)
    }
    setTotalDuration(audioPlayer.current.duration)
    audioPlayer?.current?.play()
    setAudioPlaying(true)
    setShowAudioPlayer(true)
    setIsAudioMuted(false)

    setMetadata({
      title: 'Still Worth Fighting For',
      artist: 'My Darkest Days',
      album: 'My Darkest Days',
      year: '2010',
      genre: 'Rock',
      picture:
        'https://upload.wikimedia.org/wikipedia/en/d/da/Mydarkestdays.jpg',
    })
  }

  const handleSeek = (
    e: MouseEvent | TouchEvent | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (!audioPlayer?.current || !seekBar.current) return

    const seekBarRect = seekBar.current.getBoundingClientRect()

    let moveX
    if ('touches' in e) {
      // For touch events
      moveX = e.touches[0].clientX - seekBarRect.left
    } else {
      // For mouse events
      moveX = e.clientX - seekBarRect.left
    }

    const seekBarWidth = seekBarRect.width

    // Calculate the clicked time based on the position
    let clickedTime = (moveX / seekBarWidth) * totalDuration

    // Ensure clickedTime stays within the valid range
    clickedTime = Math.max(0, Math.min(clickedTime, totalDuration))

    // Update the audio player's currentTime and current time state
    audioPlayer.current.currentTime = clickedTime
    setCurrentTime(clickedTime)
  }

  const handle10sSeek = (forward = false) => {
    if (!audioPlayer?.current) return
    const newTime = currentTime + (forward ? 10 : -10)
    if (newTime <= totalDuration) {
      audioPlayer.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const muteAudio = () => {
    if (!audioPlayer?.current) return
    setIsAudioMuted((prev) => !prev)
  }

  const handleAudioEnded = () => {
    audioPlayer?.current?.pause()
    setAudioPlaying(false)
  }

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    e.preventDefault()
    if (audioPlaying) {
      wasPlaying.current = true
      setAudioPlaying(false)
      audioPlayer?.current?.pause()
    }

    document.addEventListener('mousemove', handleSeek)
    document.addEventListener('touchmove', handleSeek)
    document.addEventListener('mouseup', handleDragEnd)
    document.addEventListener('touchend', handleDragEnd)
  }

  const handleDragEnd = () => {
    document.removeEventListener('mousemove', handleSeek)
    document.removeEventListener('touchmove', handleSeek)
    document.removeEventListener('mouseup', handleDragEnd)
    document.removeEventListener('touchend', handleDragEnd)
    if (wasPlaying.current && !audioPlayer.current?.ended) {
      setAudioPlaying(true)
      audioPlayer?.current?.play()
    }
    wasPlaying.current = false
  }
  return (
    <div className="flex min-h-full">
      <div className="w-full">
        <Header
        metadata={metadata}
        />
        <main className="border-t border-slate-200 lg:relative lg:mb-28 lg:ml-[28rem] lg:border-t-0 xl:ml-[30rem]">
          <EqualizerSVG />
          <div className="relative">
            <div className="pb-12 pt-16 sm:pb-4 lg:pt-12">
              <div className="lg:px-8">
                <div className="lg:max-w-4xl">
                  <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
                    <h1 className="text-2xl font-bold leading-7 text-slate-900">
                      Episodes
                    </h1>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
                <Article handlePlayAudio={playAudio} />
              </div>
            </div>
          </div>
        </main>
        <footer className="border-t border-slate-200 bg-slate-50 py-10 pb-40 sm:py-16 sm:pb-32 lg:hidden">
          <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4">
            <section>
              <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 10 10"
                  className="h-2.5 w-2.5"
                >
                  <path
                    d="M0 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5Z"
                    className="fill-violet-300"
                  />
                  <path
                    d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V1Z"
                    className="fill-pink-300"
                  />
                </svg>
                <span className="ml-2.5">About</span>
              </h2>
              <p className="mt-2 text-base leading-7 text-slate-700 lg:line-clamp-4">
                In this show, Eric and Wes dig deep to get to the facts with
                guests who have been labeled villains by a society quick to
                judge, without actually getting the full story. Tune in every
                Thursday to get to the truth with another misunderstood outcast
                as they share the missing context in their tragic tale.
              </p>
              <button
                type="button"
                className="mt-2 hidden text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900 lg:inline-block"
              >
                Show more
              </button>
            </section>
            <h2 className="mt-8 flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
              <svg
                aria-hidden="true"
                viewBox="0 0 11 12"
                className="h-3 w-auto fill-slate-300"
              >
                <path d="M5.019 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm3.29 7c1.175 0 2.12-1.046 1.567-2.083A5.5 5.5 0 0 0 5.019 7 5.5 5.5 0 0 0 .162 9.917C-.39 10.954.554 12 1.73 12h6.578Z" />
              </svg>
              <span className="ml-2.5">Hosted by</span>
            </h2>
            <div className="mt-2 flex gap-6 text-sm font-bold leading-7 text-slate-900">
              Eric Gordon
              <span aria-hidden="true" className="text-slate-400">
                /
              </span>
              Wes Mantooth
            </div>
          </div>
        </footer>
        <div className="fixed inset-x-0 bottom-0 z-10 lg:left-[28rem] xl:left-[30rem]">
          {showAudioPlayer && (
            <div className="flex items-center gap-6 bg-white/90 px-4 py-4 shadow shadow-slate-200/80 ring-1 ring-slate-900/5 backdrop-blur-sm md:px-6">
              <div className="hidden md:block">
                <button
                  onClick={() => {
                    audioPlayer?.current?.paused
                      ? audioPlayer.current?.play()
                      : audioPlayer?.current?.pause()
                    setAudioPlaying(!audioPlaying)
                  }}
                  type="button"
                  className="group relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 md:h-14 md:w-14"
                  aria-label="Pause"
                >
                  <div className="absolute -inset-3 md:hidden" />
                  {audioPlaying ? (
                    <svg
                      viewBox="0 0 36 36"
                      aria-hidden="true"
                      className="h-5 w-5 fill-white group-active:fill-white/80 md:h-7 md:w-7"
                    >
                      <path d="M8.5 4C7.67157 4 7 4.67157 7 5.5V30.5C7 31.3284 7.67157 32 8.5 32H11.5C12.3284 32 13 31.3284 13 30.5V5.5C13 4.67157 12.3284 4 11.5 4H8.5ZM24.5 4C23.6716 4 23 4.67157 23 5.5V30.5C23 31.3284 23.6716 32 24.5 32H27.5C28.3284 32 29 31.3284 29 30.5V5.5C29 4.67157 28.3284 4 27.5 4H24.5Z" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 36 36"
                      aria-hidden="true"
                      className="h-5 w-5 fill-white group-active:fill-white/80 md:h-7 md:w-7"
                    >
                      <path d="M33.75 16.701C34.75 17.2783 34.75 18.7217 33.75 19.299L11.25 32.2894C10.25 32.8668 9 32.1451 9 30.9904L9 5.00962C9 3.85491 10.25 3.13323 11.25 3.71058L33.75 16.701Z"></path>
                    </svg>
                  )}
                </button>
              </div>
              <div className="mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-3 overflow-hidden p-1">
                <a
                  className="truncate text-center text-sm font-bold leading-6 md:text-left"
                  title="2: Hank Scorpio"
                  href="/2"
                >
                  {metadata.title ?? '2: Hank Scorpio'}{' '}
                  {metadata.artist && `- ${metadata.artist}`}
                </a>
                <div className="flex justify-between gap-6">
                  <div className="flex items-center md:hidden">
                    <button
                      type="button"
                      className="group relative rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 md:order-none"
                      aria-label="Mute"
                    >
                      <div className="absolute -inset-4 md:hidden" />
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 fill-slate-500 stroke-slate-500 group-hover:fill-slate-700 group-hover:stroke-slate-700"
                      >
                        <path d="M12 6L8 10H6C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14H8L12 18V6Z" />
                        <path
                          d="M17 7C17 7 19 9 19 12C19 15 17 17 17 17"
                          fill="none"
                        />
                        <path
                          d="M15.5 10.5C15.5 10.5 16 10.9998 16 11.9999C16 13 15.5 13.5 15.5 13.5"
                          fill="none"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-none items-center gap-4">
                    <button
                      type="button"
                      className="group relative rounded-full focus:outline-none"
                      aria-label="Rewind 10 seconds"
                      onClick={() => handle10sSeek(false)}
                    >
                      <div className="absolute -inset-4 -right-2 md:hidden" />
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 stroke-slate-500 group-hover:stroke-slate-700"
                      >
                        <path d="M8 5L5 8M5 8L8 11M5 8H13.5C16.5376 8 19 10.4624 19 13.5C19 15.4826 18.148 17.2202 17 18.188" />
                        <path d="M5 15V19" />
                        <path d="M8 18V16C8 15.4477 8.44772 15 9 15H10C10.5523 15 11 15.4477 11 16V18C11 18.5523 10.5523 19 10 19H9C8.44772 19 8 18.5523 8 18Z" />
                      </svg>
                    </button>
                    <div className="md:hidden">
                      <button
                        type="button"
                        className="group relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 md:h-14 md:w-14"
                        aria-label={audioPlaying ? 'Play' : 'Pause'}
                        onClick={() => {
                          audioPlayer?.current?.paused
                            ? audioPlayer.current?.play()
                            : audioPlayer?.current?.pause()
                          setAudioPlaying(!audioPlaying)
                        }}
                      >
                        <div className="absolute -inset-3 md:hidden" />
                        {audioPlaying ? (
                          <svg
                            viewBox="0 0 36 36"
                            aria-hidden="true"
                            className="h-5 w-5 fill-white group-active:fill-white/80 md:h-7 md:w-7"
                          >
                            <path d="M8.5 4C7.67157 4 7 4.67157 7 5.5V30.5C7 31.3284 7.67157 32 8.5 32H11.5C12.3284 32 13 31.3284 13 30.5V5.5C13 4.67157 12.3284 4 11.5 4H8.5ZM24.5 4C23.6716 4 23 4.67157 23 5.5V30.5C23 31.3284 23.6716 32 24.5 32H27.5C28.3284 32 29 31.3284 29 30.5V5.5C29 4.67157 28.3284 4 27.5 4H24.5Z" />
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 36 36"
                            aria-hidden="true"
                            className="h-5 w-5 fill-white group-active:fill-white/80 md:h-7 md:w-7"
                          >
                            <path d="M33.75 16.701C34.75 17.2783 34.75 18.7217 33.75 19.299L11.25 32.2894C10.25 32.8668 9 32.1451 9 30.9904L9 5.00962C9 3.85491 10.25 3.13323 11.25 3.71058L33.75 16.701Z"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                    <button
                      type="button"
                      className="group relative rounded-full focus:outline-none"
                      aria-label="Fast-forward 10 seconds"
                      onClick={() => handle10sSeek(true)}
                    >
                      <div className="absolute -inset-4 -left-2 md:hidden" />
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-6 w-6 stroke-slate-500 group-hover:stroke-slate-700"
                      >
                        <path
                          d="M16 5L19 8M19 8L16 11M19 8H10.5C7.46243 8 5 10.4624 5 13.5C5 15.4826 5.85204 17.2202 7 18.188"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13 15V19"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 18V16C16 15.4477 16.4477 15 17 15H18C18.5523 15 19 15.4477 19 16V18C19 18.5523 18.5523 19 18 19H17C16.4477 19 16 18.5523 16 18Z"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    role="group"
                    id="react-aria9075083974-:r0:"
                    aria-labelledby="react-aria9075083974-:r1:"
                    className="absolute inset-x-0 bottom-full flex flex-auto touch-none items-center gap-6 md:relative"
                  >
                    <label className="sr-only">Current time</label>
                    <div
                      className="relative w-full bg-slate-100 md:rounded-full"
                      style={{ position: 'relative', touchAction: 'none' }}
                      onClick={handleSeek}
                      ref={seekBar}
                    >
                      
                      <div
                        className="h-2 md:rounded-l-xl md:rounded-r-md bg-slate-700"
                        style={{
                          width: `calc(${(currentTime / totalDuration) * 100}% - 0.25rem)`,
                        }}
                      />
                      
                      <div
                        className="absolute top-1/2 -translate-x-1/2"
                        style={{
                          left: `${(currentTime / totalDuration) * 100}%`,
                        }}
                      >
                        <div
                          className="h-4 rounded-full w-1 bg-slate-700"
                          style={{
                            position: 'absolute',
                            transform: 'translate(-50%, -50%)',
                            touchAction: 'none',
                            left: `${(currentTime / totalDuration) * 100}%`,
                          }}
                          ref={seekBarHandle}
                          onMouseDown={handleDragStart}
                          onTouchStart={handleDragStart}
                        ></div>
                      </div>
                    </div>
                    <div className="hidden items-center gap-2 md:flex">
                      <output
                        htmlFor="react-aria9075083974-:r1:-0"
                        aria-live="off"
                        className="hidden rounded-md px-1 py-0.5 font-mono text-sm leading-6 md:block text-slate-500"
                      >
                        {formatTime(currentTime)}
                      </output>
                      <span
                        className="text-sm leading-6 text-slate-300"
                        aria-hidden="true"
                      >
                        /
                      </span>
                      <span className="hidden rounded-md px-1 py-0.5 font-mono text-sm leading-6 text-slate-500 md:block">
                        {formatTime(totalDuration)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="relative flex h-6 w-6 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                        aria-label="Playback rate"
                      >
                        <div className="absolute -inset-4 md:hidden" />
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path
                            d="M13 1H3C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15H13C14.1046 15 15 14.1046 15 13V3C15 1.89543 14.1046 1 13 1Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth={2}
                          />
                          <path d="M3.75 7.25L5.25 5.77539V11.25" />
                          <path d="M8.75 7.75L11.25 10.25" />
                          <path d="M11.25 7.75L8.75 10.25" />
                        </svg>
                      </button>
                    </div>
                    <div className="hidden items-center md:flex">
                      <button
                        type="button"
                        className="group relative rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 md:order-none"
                        aria-label="Mute"
                        onClick={muteAudio}
                      >
                        <div className="absolute -inset-4 md:hidden" />
                        {isAudioMuted ? (
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 fill-slate-500 stroke-slate-500 group-hover:fill-slate-700 group-hover:stroke-slate-700"
                          >
                            <path d="M12 6L8 10H6C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14H8L12 18V6Z"></path>
                            <path d="M16 10L19 13" fill="none"></path>
                            <path d="M19 10L16 13" fill="none"></path>
                          </svg>
                        ) : (
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 fill-slate-500 stroke-slate-500 group-hover:fill-slate-700 group-hover:stroke-slate-700"
                          >
                            <path d="M12 6L8 10H6C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14H8L12 18V6Z" />
                            <path
                              d="M17 7C17 7 19 9 19 12C19 15 17 17 17 17"
                              fill="none"
                            />
                            <path
                              d="M15.5 10.5C15.5 10.5 16 10.9998 16 11.9999C16 13 15.5 13.5 15.5 13.5"
                              fill="none"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <audio
          ref={audioPlayer}
          src={StillWorth}
          onTimeUpdate={handleTimeUpdate}
          muted={isAudioMuted}
          onEnded={handleAudioEnded}
        >
          <track kind="captions" />
        </audio>
      </div>
    </div>
  )
}
