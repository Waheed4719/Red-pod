import React from 'react'

type ArticleProps = {
    handlePlayAudio: () => void,
}

const Article = ({handlePlayAudio}: ArticleProps) => {
  return (
    <article
    aria-labelledby="episode-5-title"
    className="py-10 sm:py-12"
  >
    <div className="lg:px-8">
      <div className="lg:max-w-4xl">
        <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
          <div className="flex flex-col items-start">
            <h2
              id="episode-5-title"
              className="mt-2 text-lg font-bold text-slate-900"
            >
              <a href="/5">Still Worth Fighting For - My Darkest Days</a>
            </h2>
            <time
              dateTime="2022-02-24T00:00:00.000Z"
              className="order-first font-mono text-sm leading-7 text-slate-500"
            >
              February 24, 2022
            </time>
            <p className="mt-1 text-base leading-7 text-slate-700">
              He’s going to need you to go ahead and come in on
              Saturday, but there’s a lot more to the story than
              you think.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={handlePlayAudio}
                type="button"
                aria-label="Play episode 5: Bill Lumbergh"
                className="flex items-center gap-x-3 text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 10 10"
                  className="h-2.5 w-2.5 fill-current"
                >
                  <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
                </svg>
                <span aria-hidden="true">Listen</span>
              </button>
              <span
                aria-hidden="true"
                className="text-sm font-bold text-slate-400"
              >
                /
              </span>
              <a
                className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
                aria-label="Show notes for episode 5: Bill Lumbergh"
                href="/5"
              >
                Show notes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
  )
}

export default Article