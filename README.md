This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Photo Gallery Setup

The wedding site includes a photo gallery feature that allows guests to upload photos and videos. This requires Cloudinary configuration:

### 1. Create Cloudinary Account

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Note your **Cloud Name**, **API Key**, and **API Secret** from the dashboard

### 2. Create Upload Preset

In your Cloudinary dashboard, create an upload preset named `wedding_photos` with these settings:

- **Preset name**: `wedding_photos`
- **Signing mode**: Signed
- **Folder**: `wedding-gallery`
- **Allowed formats**: jpg, png, gif, heic, heif, webp, mp4, mov, avi
- **Eager transformations**:
  - Images: `w_1920,h_1080,c_limit,q_auto,f_auto`
  - Videos: `w_1920,h_1080,c_limit,q_auto,vc_auto`
- **Auto tagging**: `wedding-photos,pending`
- **Video thumbnails**: Enabled

### 3. Configure Environment Variables

Add to `.env.local` (development) and production environment:

```bash
# Public cloud name (exposed to browser)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# API credentials (server-side only)
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Upload preset name
CLOUDINARY_UPLOAD_PRESET=wedding_photos

# 6-digit PIN for admin moderation
ADMIN_PIN=123456
```

### 4. Test Upload Flow

1. Start dev server: `npm run dev`
2. Visit `/about-us/add-your-pictures`
3. Upload a test photo
4. Check Cloudinary dashboard - photo should have `pending` tag
5. Visit `/admin/pending-photos`, enter PIN
6. Approve the photo
7. Check that it appears in the public gallery

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
