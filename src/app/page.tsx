import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-8">
      <nav className="mt-8">
        <ul className="flex flex-col gap-4 max-w-md mx-auto">
          <li>
            <Link
              href="/rsvp"
              className="flex items-center gap-3 p-6 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
            >
              <span className="text-2xl">✉️</span>
              <span className="flex-1 font-semibold text-lg">RSVP</span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              href="/about-us"
              className="flex items-center gap-3 p-6 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
            >
              <span className="text-2xl">💕</span>
              <span className="flex-1 font-semibold text-lg">Our Story</span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              href="/the-wedding/schedule"
              className="flex items-center gap-3 p-6 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
            >
              <span className="text-2xl">💒</span>
              <span className="flex-1 font-semibold text-lg">
                The Wedding/Schedule
              </span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  )
}
