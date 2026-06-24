export function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <span
      className={className}
      data-counter={value}
      data-counter-decimals={decimals}
      data-counter-prefix={prefix}
      data-counter-suffix={suffix}
      data-counter-label={`${prefix}${value.toFixed(decimals)}${suffix}`}
    >
      {prefix}
      {decimals > 0 ? "0.0" : "0"}
      {suffix}
    </span>
  );
}
