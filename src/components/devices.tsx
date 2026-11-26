import Image from "next/image";

/**
 * Generic phone and watch hardware, drawn in CSS only (no product photos, no logos), around real
 * app screens. Proportions follow a 6.3 inch phone: screen 1206 x 2622, island 31% of the screen
 * width and 2.7% down, so a capture's status bar sits either side of it as on the device.
 */
export function Phone({ children, className = "", label }: { children: React.ReactNode; className?: string; label?: string }) {
  return (
    <div className={`iphone ${className}`} role={label ? "img" : undefined} aria-label={label}>
      <span className="btn-l" aria-hidden="true" />
      <span className="btn-r" aria-hidden="true" />
      <div className="screen">
        {children}
        <span className="island" aria-hidden="true" />
        <span className="glare" aria-hidden="true" />
      </div>
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
