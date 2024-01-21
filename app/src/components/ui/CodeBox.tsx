export default function CodeBox({children}:{children: React.ReactNode}) {
  return (
    <div className="bg-gray-100 p-4">
      <code className="text-sm font-mono">
        {children}
      </code>
    </div>
  )
}