/**
 * Material Symbols Outlined ラッパー
 * wght@200 / FILL@0 / opsz@24 を基本設定とする
 */
export function MaterialIcon({
  icon,
  className,
}: {
  icon: string
  className?: string
}) {
  return (
    <span
      className={`material-symbols-outlined select-none ${className ?? ""}`}
      style={{
        fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24",
        fontSize: "24px",
        lineHeight: 1,
      }}
      aria-hidden="true"
    >
      {icon}
    </span>
  )
}
