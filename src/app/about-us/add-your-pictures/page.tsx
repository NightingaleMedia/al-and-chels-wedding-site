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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Share Your Memories
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Upload your favorite photos and videos of Chelsea and Al! You can see
          past submissions in the gallery and maybe at the event 😏
        </Typography>
      </Box>

      <PhotoUploadForm />

      <PhotoGallery />
    </Container>
  )
}
