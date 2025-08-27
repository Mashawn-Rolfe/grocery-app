import React, { useState } from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export function ImageWithFallback({ src, fallbackSrc, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      {...props}
      src={imgSrc}
      onError={() => {
        if (fallbackSrc) setImgSrc(fallbackSrc);
      }}
      alt={props.alt}
    />
  );
}