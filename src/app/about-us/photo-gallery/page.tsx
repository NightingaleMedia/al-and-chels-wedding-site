import { Container, Typography, Box } from '@mui/material'
import PhotoUploadForm from '@/components/gallery/PhotoUploadForm'
import PhotoGallery from '@/components/gallery/PhotoGallery'

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function PicturesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PhotoGallery />
    </Container>
  )
}
