// Module augmentation for Material-UI to support custom Paper variants

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    form: true
  }
}

export {}
