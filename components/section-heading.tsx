type SectionHeadingProps = {
  index: string
  label: string
  title: string
  description?: string
}

export function SectionHeading({
  index,
  label,
  title,
  description
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-kicker">
        <span>{index}</span>
        <span>{label}</span>
      </div>
      <div className="section-heading-copy">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  )
}
