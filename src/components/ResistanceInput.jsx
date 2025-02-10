import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Minus } from "lucide-react"

const types = ["normal", "fire", "water", "grass", "electric", "psychic", "dark", "fighting"]

export function ResistanceInput({ onChangeResistance }) {
  const [type, setType] = useState("")
  const [value, setValue] = useState("0")

  const handleChange = () => {
    if (typeof onChangeResistance === "function") {
      onChangeResistance({ type, value })
    }
  }

  const incrementValue = () => {
    setValue((prev) => {
      const newValue = String(Number(prev) + 10)
      handleChange()
      return newValue
    })
  }

  const decrementValue = () => {
    setValue((prev) => {
      const newValue = String(Math.max(0, Number(prev) - 10))
      handleChange()
      return newValue
    })
  }

  return (
    <div className="space-y-4">
      <Label>Resistenza</Label>
      <Card className="p-4 space-y-4">
        <div>
          <Label>Tipo</Label>
          <Select
            value={type}
            onValueChange={(newType) => {
              setType(newType)
              handleChange()
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleziona un tipo" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Valore</Label>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="icon" onClick={decrementValue}>
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                handleChange()
              }}
              className="w-20 text-center"
            />
            <Button type="button" variant="outline" size="icon" onClick={incrementValue}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

