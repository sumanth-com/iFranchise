/**
 * img with optional srcSet — bundled or remote (Unsplash).
 */
import { forwardRef } from 'react';
import { unsplashSrcSet } from '../../lib/unsplashResponsive';

const ResponsiveImg = forwardRef(function ResponsiveImg(
  {
    src,
    alt = '',
    className = '',
    width,
    height,
    sizes,
    srcSet: srcSetProp,
    loading = 'lazy',
    priority = false,
    remote = false,
    onLoad,
    onError,
    style,
    ...rest
  },
  ref,
) {
  const remoteSet =
    remote || (typeof src === 'string' && src.includes('unsplash.com'))
      ? unsplashSrcSet(src, undefined, sizes)
      : null;

  const resolvedSrc = remoteSet?.src ?? src;
  const resolvedSrcSet = srcSetProp ?? remoteSet?.srcSet;
  const resolvedSizes = sizes ?? remoteSet?.sizes;

  return (
    <img
      ref={ref}
      src={resolvedSrc}
      srcSet={resolvedSrcSet}
      sizes={resolvedSizes}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onLoad={onLoad}
      onError={onError}
      style={style}
      {...rest}
    />
  );
});

export default ResponsiveImg;
