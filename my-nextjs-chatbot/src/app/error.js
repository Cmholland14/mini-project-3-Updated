'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({ error, reset }) {
  useEffect(() => {

    console.error('Global error boundary:', error);
  }, [error]);

  const isDev = process.env.NODE_ENV !== 'production';

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
          background: '#0b0c10',
          color: '#e5e7eb',
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <main
          role="alert"
          aria-live="assertive"
          style={{
            width: 'min(680px, 92vw)',
            background: '#111827',
            border: '1px solid #1f2937',
            padding: '28px',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
          }}
        >
          <h1 style={{ margin: '0 0 8px', fontSize: '1.5rem' }}>Something went wrong</h1>
          <p style={{ margin: '0 0 20px', lineHeight: 1.6 }}>
            We couldn’t complete your request. You can try again or head back home.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid #374151',
                background: '#1f2937',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid #374151',
                background: 'transparent',
                color: '#93c5fd',
                textDecoration: 'none',
              }}
            >
              Go home
            </Link>
          </div>

          {isDev && (
            <details style={{ marginTop: '18px' }}>
              <summary style={{ cursor: 'pointer' }}>Error details (dev only)</summary>
              <pre
                style={{
                  marginTop: '10px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  background: '#0b0c10',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #1f2937',
                }}
              >
                {error?.message || String(error)}
                {'\n\n'}
                {error?.stack}
              </pre>
            </details>
          )}
        </main>
      </body>
    </html>
  );
}
