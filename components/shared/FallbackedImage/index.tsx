import Image from "next/image";
import { useState } from "react";

type FallbackedImageProps = {
  url: string;
  fallBackUrl: string;
  className?: string;
};

const FallbackedImage = ({
  url,
  className,
  fallBackUrl,
}: FallbackedImageProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Image
      className={className}
      src={imageError ? fallBackUrl : url}
      width="50"
      height="50"
      alt="dapplet icon"
      onError={() => setImageError(true)}
    />
  );
};

export default FallbackedImage;
