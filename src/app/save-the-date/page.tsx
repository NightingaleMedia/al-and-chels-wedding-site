import { Typography } from '@mui/material'

export default function SaveTheDatePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <Typography variant="h1" className="mb-4">
          Save The Date
        </Typography>
        <div className="mt-4">
          <Typography variant="body1">May 28, 2027</Typography>
          <Typography variant="body1">Swanton, OH</Typography>
        </div>
      </div>
    </div>
  )
}
