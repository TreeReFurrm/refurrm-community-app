import Image from "next/image";

type LogoProps = {
  className?: string;
  src?: string;
  alt?: string;
  priority?: boolean;
};

export default function Logo({
  className = "h-8 w-8",
  src = "/logo.png",
  alt = "Company logo",
  priority = false,
}: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 48px, 96px"
        className="object-contain"
        priority={priority}
      />
    </div>
  );
}
