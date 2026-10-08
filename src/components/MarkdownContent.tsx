import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

export async function MarkdownContent({ file }: { file: string }) {
  const raw = await fs.readFile(
    path.join(process.cwd(), 'src/content', file),
    'utf8',
  )
  const { content } = matter(raw)

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <Typography variant="h1" sx={{ mb: 4 }}>
            {children}
          </Typography>
        ),
        h2: ({ children }) => (
          <Typography variant="h2" component="h2" className="mt-8 mb-3">
            {children}
          </Typography>
        ),
        h3: ({ children }) => (
          <Typography
            variant="h3"
            component="h3"
            sx={{ fontSize: '1.5rem', mb: 2, mt: 2 }}
          >
            {children}
          </Typography>
        ),
        h4: ({ children }) => (
          <Typography
            variant="h4"
            component="h4"
            sx={{ mb: 1, mt: 2, fontSize: '1rem' }}
          >
            {children}
          </Typography>
        ),
        p: ({ children }) => (
          <Typography className="mb-4">{children}</Typography>
        ),
        a: ({ href = '', children }) => (
          <Link
            href={href}
            {...(href.startsWith('http') && {
              target: '_blank',
              rel: 'noopener noreferrer',
            })}
          >
            {children}
          </Link>
        ),
        ul: ({ children }) => (
          <ul className="my-6 list-disc !pl-10">{children}</ul>
        ),
        li: ({ children }) => <li className="mb-2">{children}</li>,
        ol: ({ children }) => (
          <ol className="mb-4 list-decimal !pl-6">{children}</ol>
        ),
        blockquote: ({ children }) => (
          <blockquote className="mb-4 border-l-4 pl-4">{children}</blockquote>
        ),
        hr: () => <Divider sx={{ my: 6 }} />,
        br: () => <br />,
      }}
    >
      {content}
    </Markdown>
  )
}
