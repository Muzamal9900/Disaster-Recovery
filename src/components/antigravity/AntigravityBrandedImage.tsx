/**
 * AntigravityBrandedImage — SEO-optimised image wrapper with Schema.org microdata
 * Converted from BrandedImage.astro — uses Next.js <Image>
 */

import Image from 'next/image';
import { AntigravityBrandLogo } from './AntigravityBrandLogo';

interface AntigravityBrandedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  caption?: string;
  style?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  priority?: boolean;
}

export function AntigravityBrandedImage({
  src,
  alt,
  className = '',
  width,
  height,
  caption,
  style,
  imageStyle,
  priority = false,
}: AntigravityBrandedImageProps) {
  return (
    <figure
      className={`ag-branded-image-wrapper ${className}`}
      style={style}
      itemScope
      itemType="https://schema.org/ImageObject"
    >
      <Image
        src={src}
        alt={alt}
        width={width || 1200}
        height={height || 800}
        className="ag-main-image"
        style={{ objectFit: 'cover', ...imageStyle }}
        itemProp="contentUrl"
        priority={priority}
        sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, (max-width: 1200px) 1200px, 2000px"
      />
      <meta itemProp="name" content={alt} />

      <div className="ag-watermark-overlay" aria-hidden="true">
        <AntigravityBrandLogo width="90px" />
      </div>

      {caption && (
        <figcaption itemProp="caption" className="sr-only">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
