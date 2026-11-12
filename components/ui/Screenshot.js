import Image from "next/image";

export default function Screenshot({ image, sizes, className = "", eager = false, frameRatio }) {
  // Small source images get padding so they are not stretched past their native size;
  // everything else displays at its real aspect ratio, uncropped.
  const isSmall = image.width < 1200;
  return (
    <figure className={`group ${className}`}>
      <div className="relative rounded-2xl p-px bg-gradient-to-br from-neutral-700/60 via-neutral-800 to-neutral-800 group-hover:from-blue-500/50 group-hover:to-purple-500/40 transition-colors duration-500">
        <div
          className={`relative rounded-[calc(1rem-1px)] overflow-hidden bg-neutral-950 ${isSmall ? "aspect-[16/10] p-4 sm:p-6" : ""}`}
          style={isSmall ? undefined : { aspectRatio: frameRatio ?? `${image.width} / ${image.height}` }}
        >
          <div className="relative w-full h-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              loading={eager ? "eager" : "lazy"}
              className={`${isSmall || frameRatio ? "object-contain" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
            />
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-neutral-500 leading-relaxed">{image.alt}</figcaption>
    </figure>
  );
}
