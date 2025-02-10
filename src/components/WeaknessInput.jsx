import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Minus, Asterisk } from "lucide-react"
import { types } from "@/data/pokemonTypes"



export function WeaknessInput({ formData, setFormData }) {
  const [type, setType] = useState("")
  const [value, setValue] = useState("")
  const [symbol, setSymbol] = useState("")

  const handleChange = (e, field) => {
    const value = e.target.value;
    if (field === 'type') {
        setType(value)
        onAdd({ type: value, value })
    } else {
        setValue(value)
        onAdd({type, value: value})
    }
  }

  const handleButtonClick = (symbol) => {
    console.log(symbol) // Stampa il simbolo cliccato nella console
    onAdd({ symbol })
  }


  return (
    <div className="space-y-4">
      <Label>Debolezza</Label>
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
              {types.map((energy) => (
                <SelectItem key={energy.value} value={energy.value}>
                  {energy.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Valore</Label>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="icon" onClick={() => handleButtonClick("-")}>
              <Minus className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="icon" onClick={() => handleButtonClick("*")}>
              <Asterisk className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="icon" onClick={() => handleButtonClick("+")}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

