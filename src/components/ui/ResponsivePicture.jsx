/**
 * Responsive <picture>: AVIF → WebP → fallback. Same visual output, smaller payload.
 */
import { buildResponsiveSrc } from '../../lib/responsiveImage';

export default function ResponsivePicture({
  avif,
  webp,
  webpSrcSet,
  fallback,
  alt = '',
  className = '',
  pictureClassName = '',
  loading = 'lazy',
  priority = false,
  sizes,
  width,
  height,
  onLoad,
  ...rest
}) {
  const resolvedLoading = priority ? 'eager' : loading;
  const { src, srcSet, sizes: resolvedSizes } = buildResponsiveSrc(
    webpSrcSet || {},
    webp || fallback,
    sizes,
  );

  return (
    <picture className={pictureClassName}>
      {avif ? <source type="image/avif" srcSet={avif} sizes={resolvedSizes} /> : null}
      {srcSet ? (
        <source type="image/webp" srcSet={srcSet} sizes={resolvedSizes} />
      ) : webp ? (
        <source type="image/webp" srcSet={webp} sizes={resolvedSizes} />
      ) : null}
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={resolvedLoading}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={resolvedSizes}
        onLoad={onLoad}
        {...rest}
      />
    </picture>
  );
}
