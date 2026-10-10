// Module augmentation for Material-UI to support custom Paper variants

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    form: true
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    special: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    special?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    special: true
  }
}

export {}
