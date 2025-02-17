import { useLocation } from "react-router"


export default function DatabasePage() {
  const location = useLocation()
  const cardData = location.state?.cardData || {}

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Card data</h1>
      <pre className="bg-gray-100 p-4 rounded-lg">{JSON.stringify(cardData, null, 2)}</pre>
    </div>
  )
}