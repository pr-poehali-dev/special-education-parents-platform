import { useRef, useEffect } from "react";

interface EditableTextProps {
  value: string;
  onChange: (val: string) => void;
  editMode: boolean;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  multiline?: boolean;
}

export default function EditableText({
  value,
  onChange,
  editMode,
  tag: Tag = "span",
  className = "",
  multiline = false,
}: EditableTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, [value, editMode]);

  if (!editMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLParagraphElement>}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange((e.target as HTMLElement).textContent || "")}
      onKeyDown={(e) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          (e.target as HTMLElement).blur();
        }
      }}
      className={`${className} outline-none cursor-text relative`}
      style={{
        boxShadow: "0 0 0 2px #8B6E4E44, 0 2px 8px #8B6E4E22",
        borderRadius: 2,
        padding: "0 4px",
        transition: "box-shadow 0.2s",
      }}
      title="Кликните для редактирования"
    >
      {value}
    </Tag>
  );
}
