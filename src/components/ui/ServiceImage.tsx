import { useState } from "react";
import { ImagePlaceholder } from "./ImagePlaceholder";

type ServiceImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
};

export function ServiceImage({
  src,
  alt,
  className = "",
  loading = "lazy",
}: ServiceImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return <ImagePlaceholder label={alt} className={className} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailedSrc(src)}
      className={`w-full rounded-xl bg-base-300 object-cover ${className}`}
    />
  );
}
