import { StoryForm } from '@/components/forms/StoryForm/StoryForm'
import { Box, Typography } from '@mui/material'
import { StoryGallery } from '@/components/stories/StoryGallery'

export default function AddYourStoryPage() {
  return (
    <Box className="w-full lg:max-w-5xl px-4 m-auto" sx={{ py: 4 }}>
      <Box className="flex lg:grid lg:grid-cols-[2fr_3fr] flex-col gap-6">
        <StoryForm />
        <Box>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Past Entries
          </Typography>
          <StoryGallery />
        </Box>
      </Box>
    </Box>
  )
}
