import { useEffect, useState } from "react"
import { Database, Download, Plus, Save, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCard } from "@/context/CardProvider"
import { TypeSelector } from "@/components/TypeSelector"
import { ImageUrlInput } from "@/components/ImageUrlInput"
import { CardPreview } from "@/components/CardPreview"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { AttackInput } from "@/components/AttackInput"
import { AbilityInput } from "@/components/AbilityInput"
import { WeaknessInput } from "@/components/WeaknessInput"
import { ResistanceInput } from "@/components/ResistanceInput"
import { RetreatCostInput } from "@/components/RetreatInput"
import { Card } from "@/components/ui/card"


export function Dashboard() {
  const [formData, setFormData] = useState({
    type: "fire",
    name: "",
    HP: "0",
    img: "",
    abilityName: "",
    abilityDescription: "",
    attackName: "",
    attackDescription: "",
    attackDamage: "",
    attackModifier: "",
    weakness: "",
    resistance: "",
    retreat: ""
  })
  const [isEditing, setIsEditing] = useState(false);

  const { cards , createCard, getDataCards, deleteCard, updateCard } = useCard()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    getDataCards();
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateCard(formData); // Se stiamo modificando, aggiorna la carta
    } else {
      createCard(formData); // Se è nuova, crea la carta
    }
  
    console.log(formData);
    // Reset form
    setFormData({
        type: "fire",
        name: "",
        HP: "0",
        img: "",
        abilityName: "",
        abilityDescription: "",
        attackName: "",
        attackDescription: "",
        attackDamage: "",
        attackModifier: "",
        weakness: [],
        resistance: "",
    });
  };


  return (
    <div className="mx-auto grid gap-6 p-4 md:grid-cols-3">
      {/* Editor Form */}
      <div className="space-y-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">Editor</h1>
            <p className="text-sm text-muted-foreground">Crea una nuova carta</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <DropdownMenu>
            <DropdownMenuTrigger>
                <Button size="icon" variant="outline">
                    <Download className="h-6 w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Cards</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {cards.map((card, index) => (
                    <div className="flex justify-between items-center ">
                    <DropdownMenuItem
                      onSelect={() => {
                        setFormData((prev) => ({
                          ...prev,
                          ...card
                        }));
                        setIsEditing(true); // Abilita la modalità di modifica
                      }}>
                      {card.name || `Carta ${index + 1}`}
                    </DropdownMenuItem>
                      <Button size='icon' variant='ghost' className='h-5 w-5' onClick={() => deleteCard(card)}>
                        <X className="h-4 w-4 text-destructive"/> 
                      </Button>
                    </div>
                ))} 
            </DropdownMenuContent>
            </DropdownMenu>
            <Button size="icon" variant="outline" className="mt-[5px]">
              <Database className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TypeSelector value={formData.type} onChange={(value) => setFormData((prev) => ({ ...prev, type: value }))} />

          <div>
            <Label htmlFor="name">Nome Pokemon</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nome del pokemon"
            />
          </div>

          <div>
            <Label htmlFor="hp">Punti Vita</Label>
            <Input type="number" name="HP" value={formData.HP} onChange={handleInputChange} />
          </div>

          <ImageUrlInput value={formData.img} onChange={(value) => setFormData((prev) => ({ ...prev, img: value }))} />

          <AbilityInput formData={formData} setFormData={setFormData} />

          <AttackInput formData={formData} setFormData={setFormData} />

          <WeaknessInput 
            type='Weakness'
            onAdd={(weak) => setFormData((prev) => ({ ...prev, weakness: [weak] }))}
          />

          <ResistanceInput 
            type='Resistence'
            onAdd={(res) => setFormData((prev) => ({...prev, resistance: [res]}))}
          />

          <RetreatCostInput 
            type='Retreat'
            onAdd={(ret) => setFormData((prev) => ({...prev, retreat: [ret]}))}
          />

          <div className="flex gap-4">
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isEditing ? 'Update and Save' : 'Save in DB'}
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Scarica
            </Button>
          </div>
        </form>
      </div>

      {/* Card Preview */}
      <CardPreview formData={formData} />
    </div>
  )
}

