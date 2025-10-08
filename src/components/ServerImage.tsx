
import Image from "next/image";

export function ServerHeroImage({ src, alt }: Readonly<{ src: string; alt: string }>) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      sizes="100vw"
      quality={85}
      className="object-cover"
    />
  );
}
