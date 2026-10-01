import Image from 'next/image'

export const LoadingPageComponents = () => (
  <>
    <div className="flex justify-center items-center h-[var(--content-height)]">
      <Image
        src="/marigold_256.png"
        className="spin-slow"
        alt="Logo"
        width={120}
        height={120}
      />
    </div>
  </>
)
