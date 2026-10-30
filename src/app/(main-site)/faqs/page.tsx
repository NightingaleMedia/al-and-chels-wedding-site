import { Box, Typography } from '@mui/material'
import { FAQItem } from '@/components/FAQItem'
import { faqData } from '@/content/faq'

export default function FaqsPage() {
  return (
    <Box className="pt-8 px-4" sx={{ maxWidth: '600px', mx: 'auto' }}>
      <Typography
        variant="special"
        component="h1"
        className="text-center"
        sx={{ mb: 4 }}
      >
        faqs
      </Typography>

      {faqData.map((item, index) => (
        <FAQItem key={index} item={item} />
      ))}
    </Box>
  )
}
