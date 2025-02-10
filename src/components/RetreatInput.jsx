import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Minus } from "lucide-react"

export function RetreatCostInput({ onChangeRetreat }) {
  const [cost, setCost] = useState(0)

  const handleChange = (newCost) => {
    setCost(newCost)
    if (typeof onChangeRetreat === "function") {
      onChangeRetreat(newCost)
    }
  }

  const handleIncrement = () => {
    const newCost = Math.min(cost + 1, 4) // Maximum 4 energy cost
    handleChange(newCost)
  }

  const handleDecrement = () => {
    const newCost = Math.max(0, cost - 1)
    handleChange(newCost)
  }

  return (
    <div className="space-y-4">
      <Label>Costo Ritiro</Label>
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {[...Array(cost)].map((_, i) => (
              <div key={i} className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                ⭐
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="icon" onClick={handleDecrement} disabled={cost === 0}>
              <Minus className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="icon" onClick={handleIncrement} disabled={cost === 4}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

