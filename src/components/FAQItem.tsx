import { Box, Typography } from '@mui/material'
import { FAQItem as FAQItemType } from '@/content/faq'

interface FAQItemProps {
  item: FAQItemType
}

export function FAQItem({ item }: FAQItemProps) {
  return (
    <Box
      component="article"
      sx={{
        p: 3,
        mb: 2,
        border: 1,
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
      className="bg-card"
    >
      <Typography
        variant="h6"
        component="h3"
        sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 1 }}
      >
        {item.question}
      </Typography>
      <Typography
        variant="body2"
        component={'div'}
        sx={{ fontSize: '0.8rem', color: 'text.secondary' }}
      >
        <Box dangerouslySetInnerHTML={{ __html: item.answer }}></Box>
        {/* {item.answer} */}
      </Typography>
    </Box>
  )
}
