/**
 * Production image primitive: lazy load, async decode, CLS-safe dimensions, priority hint.
 * Visual output unchanged — only loading/rendering behavior is optimized.
 */
export default function OptimizedImage({
  src,
  alt = '',
  className = '',
  width,
  height,
  sizes,
  srcSet,
  loading = 'lazy',
  priority = false,
  draggable = false,
  onLoad,
  onError,
  ...rest
}) {
  const resolvedLoading = priority ? 'eager' : loading;

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      srcSet={srcSet}
      loading={resolvedLoading}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      draggable={draggable}
      onLoad={onLoad}
      onError={onError}
      className={className}
      {...rest}
    />
  );
}
