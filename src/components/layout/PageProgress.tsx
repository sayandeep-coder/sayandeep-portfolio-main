import { useScrollProgress } from '../../hooks/useScrollProgress';

export function PageProgress() {
  const progress = useScrollProgress();

  return (
    <div
      id="pbar"
      aria-hidden="true"
      style={{
        transform: `scaleX(${progress})`,
        transformOrigin: 'left',
      }}
    />
  );
}
