export default function ErrorMessage({children} : {children: React.ReactNode}) {
  return (
    <div className="text-danger font-bold">
        {children}
    </div>
  )
}