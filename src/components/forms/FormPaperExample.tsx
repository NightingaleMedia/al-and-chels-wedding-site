'use client'

import { Paper, Typography } from '@mui/material'

/**
 * Example component demonstrating the custom "form" Paper variant
 * This can be used as a reference or removed after verification
 */
export default function FormPaperExample() {
  return (
    <div style={{ padding: '20px' }}>
      {/* Example of form variant usage */}
      <Paper variant="form">
        <Typography variant="h5" gutterBottom>
          Form Paper Variant Example
        </Typography>
        <Typography variant="body1">
          This Paper component uses the custom &quot;form&quot; variant defined
          in the theme. The styling includes customizable padding, elevation,
          border, background color, and border radius.
        </Typography>
      </Paper>

      <div style={{ marginTop: '20px' }}>
        {/* Example of default Paper for comparison */}
        <Paper style={{ padding: '24px' }}>
          <Typography variant="h5" gutterBottom>
            Default Paper (for comparison)
          </Typography>
          <Typography variant="body1">
            This is a standard Paper component without the variant prop.
          </Typography>
        </Paper>
      </div>
    </div>
  )
}
