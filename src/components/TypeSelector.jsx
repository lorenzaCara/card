import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { types } from "../data/pokemonTypes"

export function TypeSelector({ value, onChange }) {
  const selectedType = types.find((type) => type.value === value)

  return (
    <div>
      <Label htmlFor="type">Tipo</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue>
            <div className="flex items-center gap-2">
              <img src={selectedType?.imgSrc || "/placeholder.svg"} alt={value} className="h-5 w-5" />
              {selectedType?.label}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {types.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              <div className="flex items-center gap-2">
                <img src={type.imgSrc || "/placeholder.svg"} alt={type.label} className="h-5 w-5" />
                {type.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

