type FeatureToggle = {
  preprod: boolean
  prod: boolean
}
export const FEATURES: {
  navbar: FeatureToggle
  onlySaveTheDate: FeatureToggle
  pages: Record<string, FeatureToggle>
} = {
  navbar: {
    preprod: true,
    prod: true,
  },
  onlySaveTheDate: {
    preprod: false,
    prod: false,
  },
  pages: {
    '/': { preprod: true, prod: true },
    '/about-us': { preprod: true, prod: true },
    '/about-us/add-your-pictures': { preprod: true, prod: true },
    '/about-us/add-your-story': { preprod: true, prod: true },
    '/faqs': { preprod: true, prod: true },
    '/privacy-policy': { preprod: true, prod: true },
    '/registry': { preprod: true, prod: true },
    '/rsvp': { preprod: true, prod: true },
    '/rsvp/[partyId]': { preprod: true, prod: true },
    '/save-the-date': { preprod: true, prod: true },
    '/terms-and-conditions': { preprod: true, prod: true },
    '/the-location': { preprod: true, prod: true },
    '/the-wedding/location': { preprod: true, prod: true },
    '/the-wedding/schedule': { preprod: true, prod: true },
    '/travel': { preprod: true, prod: true },
    '/travel/accommodations': { preprod: true, prod: true },
    '/travel/day-of-travel': { preprod: true, prod: true },
    '/travel/getting-there': { preprod: true, prod: true },
  },
}
