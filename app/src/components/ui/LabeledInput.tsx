export default function LabeledInput({
  label, name, placeholder, defaultValue, maxLength, width,
}: {
  label: string,
  name: string,
  placeholder: string
  defaultValue: string,
  maxLength: number,
  width: string,
}) {
  return (
    <div className="flex flex-col justify-center items-start">
      <div className="text-xs">
        {label}
      </div>
      <input type="text" name={name} placeholder={placeholder} defaultValue={defaultValue} maxLength={maxLength} className={`text-highlight font-mono border-[1px] border-highlight bg-buttonbg px-4 py-2 ${width}`} />
    </div>
  )
}