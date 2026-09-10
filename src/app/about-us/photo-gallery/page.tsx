import { Container, Typography, Box } from '@mui/material'
import PhotoUploadForm from '@/components/gallery/PhotoUploadForm'
import PhotoGallery from '@/components/gallery/PhotoGallery'

export default function PicturesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PhotoGallery />
    </Container>
  )
}
