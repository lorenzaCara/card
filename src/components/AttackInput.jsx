import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X, Minus, Asterisk } from "lucide-react"
import { types } from "@/data/pokemonTypes"

/* const energyTypes = [
  { type: "normal", icon: "⭐" },
  { type: "fire", icon: "🔥" },
  { type: "water", icon: "💧" },
  { type: "grass", icon: "🌿" },
  { type: "electric", icon: "⚡" },
  { type: "psychic", icon: "👁" },
  { type: "dark", icon: "🌑" },
  { type: "fighting", icon: "👊" },
] */

export function AttackInput({ formData, setFormData, onChange, value }) {
  const [show, setShow] = useState(false)
  const [attackModifier, setAttackModifier] = useState("");
  const selectedType = types.find((type) => type.value === value)

  const handleModifierClick = (modifier, e) => {
    e.preventDefault(); // Evita il comportamento predefinito del bottone
    setAttackModifier((prev) => (prev === modifier ? "" : modifier)); // Se è già selezionato, lo deseleziona
    setFormData((prev) => ({ ...prev, attackModifier: prev === modifier ? "" : modifier }));
};

  /* const [name, setName] = useState("")
  const [energyCost, setEnergyCost] = useState([])
  const [damage, setDamage] = useState("0")
  const [description, setDescription] = useState("")

  const handleAdd = () => {
    onAdd({ name, energyCost, damage, description })
    setName("")
    setEnergyCost([])
    setDamage("0")
    setDescription("")
    setShow(false)
  }

  const handleAddEnergy = (energyType) => {
    setEnergyCost([...energyCost, energyType])
  }

  const handleRemoveEnergy = (index) => {
    setEnergyCost(energyCost.filter((_, i) => i !== index))
  }

  const handleAddPlus = () => {
    setEnergyCost([...energyCost, "plus"]);
  }

  const handleAddMinus = () => {
    setEnergyCost([...energyCost, "minus"])
  } */

  return (
    <div>
      <div className="flex justify-between pb-2">
        <Label htmlFor='Attacks'>Attacks</Label>
        <Button type="button" variant="outline" className="p-2 h-6 w-6" onClick={() => setShow(true)}>
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      {show ? (
        <Card className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor='Name'>Nome</Label>
            <Button type="button" variant="ghost" className="p-2 h-6 w-6" onClick={() => setShow(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <Input
            type='text'
            value={formData.attackName}
            onChange={(e) => 
              setFormData((prev) => ({ ...prev, attackName: e.target.value }))
            }
            placeholder='Attacks'
          />
          {/* <Input
            type='text'
            value={formData.attackName}
            onChange={(e) => 
              setFormData((prev) => ({ ...prev, attackName: e.target.value }))
            }
            placeholder='Attacks'
          /> */}
        <div>
            <Label htmlFor="damage">Danno</Label>
            <div className="flex items-center gap-2 mt-2">
            <Input
              type="number"
              value={formData.attackDamage}
              className="w-full"
              min="0" // Impedisce l'inserimento di numeri negativi
              onChange={(e) => 
                setFormData((prev) => ({ ...prev, attackDamage: e.target.value }))
              }
            />
            <Button
              variant={attackModifier === "+" ? "default" : "outline"}
              onClick={(e) => handleModifierClick("+", e)}
            >
              <p className="text-lg">+</p>
            </Button>
            <Button
              variant={attackModifier === "-" ? "default" : "outline"}
              onClick={(e) => handleModifierClick("-", e)}
            >
              <p className="text-lg">-</p>
            </Button>
            <Button
              variant={attackModifier === "x" ? "default" : "outline"}
              onClick={(e) => handleModifierClick("x", e)}
            >
              <p className="text-lg">x</p>
            </Button>

            </div>
        </div>

        <Label htmlFor='Description'>Description</Label>
          <Textarea
            type='text'
            value={formData.attackDescription}
            onChange={(e) => 
              setFormData((prev) => ({ ...prev, attackDescription: e.target.value }))
            }
            placeholder='Description...'
          />

          {/* <div>
            <Label>Energia</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {types.map((energy) => (
                <Button
                  key={energy.type}
                  type="button"
                  variant="outline"
                  className="p-2 h-8 w-8 rounded-full"
                  size='icon'
                  onClick={onChange}
                >
                  <img src={energy.imgSrc} className="w-8" />
                </Button>
              ))}
                <Button 
                    type="button"
                    variant="outline"
                    className="p-2 h-8 w-8 rounded-full"
                    size='icon'
                >
                    <Plus />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="p-2 h-8 w-8 rounded-full"
                    size='icon'
                >
                    <Minus />
                </Button>
            </div>
          </div>

          {selectedType.length > 0 && (
            <div>
              <Label>Costo:</Label>
              <div className="flex gap-2 mt-2">
                {types.map((energy, index) => (
                  <div key={index} className="relative">
                    <Button variant="outline" className="p-2 h-8 w-8 rounded-full">
                      <img src={types.find((e) => e.type === energy)?.imgSrc} alt={energy} className="w-8"/>
                    </Button>
                    <Button
                      variant="ghost"
                      className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0"
                      onClick={() => handleRemoveEnergy(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )} */}


          <Button className="w-full">
            + Add attack
          </Button>
        </Card>
      ) : (
        <Card className="p-4 text-center text-sm text-muted-foreground">
          There are no attacks
        </Card>
      )}
    </div>
  )
}

