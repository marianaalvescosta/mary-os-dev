/** "ls xyz ————————" header row with an optional right-side slot. */
export default function PageHeader({
  label,
  right,
}: {
  label: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-dim text-xs whitespace-nowrap">{label}</span>
      <div className="flex-1 h-px bg-white" />
      {right}
    </div>
  );
}
