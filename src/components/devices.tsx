import Image from "next/image";

/**
 * The phone is Apple's real iPhone 17 Pro product bezel (Deep Blue) laid over a masked screen; the
 * Watch is composited offline (public/watch/*-device.webp). Both from Apple's product bezels, used
 * to show this app on Apple hardware.
 */
export function Phone({ children, className = "", label }: { children: React.ReactNode; className?: string; label?: string }) {
  return (
    <div className={`iphone ${className}`} role={label ? "img" : undefined} aria-label={label}>
      <div className="screen">
        {children}
        <span className="glare" aria-hidden="true" />
      </div>
      {/* Apple's iPhone 17 Pro bezel, Deep Blue (public/devices, from the Device Mockups set). */}
      <img className="bezel" src="/devices/iphone-17-pro-deep-blue.webp" alt="" aria-hidden="true" width={750} height={1533} decoding="async" draggable={false} />
    </div>
  );
}

/** A whole app capture (900 x 1956) in a phone frame. */
export function PhoneShot({ src, alt, className = "", priority = false, sizes = "(max-width: 600px) 60vw, 280px" }: {
  src: string; alt: string; className?: string; priority?: boolean; sizes?: string;
}) {
  return (
    <Phone className={className}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="fill" />
    </Phone>
  );
}

/** A 9:16 video frame rendered by the app, shown the way the player shows it: whole, on black. */
export function PhoneRender({ src, alt, className = "", sizes = "(max-width: 600px) 60vw, 280px" }: { src: string; alt: string; className?: string; sizes?: string }) {
  return (
    <Phone className={className}>
      <Image src={src} alt={alt} fill sizes={sizes} className="fill contain" />
    </Phone>
  );
}

export function WatchFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`awatch ${className}`}>
      <span className="wband wband-top" aria-hidden="true" />
      <span className="wband wband-bottom" aria-hidden="true" />
      <span className="crown" aria-hidden="true" />
      <span className="sidebtn" aria-hidden="true" />
      <div className="case"><div className="wscreen">{children}<span className="glare" aria-hidden="true" /></div></div>
    </div>
  );
}
