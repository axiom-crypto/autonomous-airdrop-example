export default function Title({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="font-mono text-3xl text-highlight font-bold text-center">
      {children}
    </div>
  )
}