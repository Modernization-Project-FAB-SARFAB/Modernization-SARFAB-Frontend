export default function ErrorFormMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-left text-danger font-bold p-3 uppercase text-xs">
      * {children}
    </div>
  )
}