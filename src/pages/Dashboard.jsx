import { useEffect, useState, useRef } from "react"
import html2canvas from "html2canvas"
import { Database, Download, Save, X } from "lucide-react"
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
import { RetreatCostInput } from "@/components/RetreatInput"
import { ResistanceInput } from "@/components/ResistanceInput"
import { useNavigate } from "react-router"

const initialFormData = {
  type: "fire",
  name: "",
  HP: "",
  img: "",
  abilities: [],
  attacks: [],
  weaknesses: [],
  resistances: [],
  retreat: "",
}

export function Dashboard() {
  const [formData, setFormData] = useState(initialFormData)
  const [isEditing, setIsEditing] = useState(false)
  const { cards, createCard, getDataCards, deleteCard, updateCard } = useCard()
  const cardRef = useRef(null)
  const navigate = useNavigate()

  const handleDatabaseClick = () => {
    navigate("/database", { state: { cardData: formData } })
  }

  useEffect(() => {
    getDataCards()
  }, [getDataCards])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    isEditing ? updateCard(formData) : createCard(formData)
    setIsEditing(false)
    setFormData(initialFormData)
  }

  const handleDownload = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        logging: true, // Abilita log per debugging
        scrollX: 0, // Evita scroll interni durante il rendering
        scrollY: 0, // Evita scroll interni durante il rendering
        scale: 2,   // Aumenta la qualità
        useCORS: true, // Per evitare problemi con immagini esterne
        backgroundColor: "#fff" // Imposta uno sfondo bianco
      });
      const image = canvas.toDataURL("image/jpeg", 0.9);
      const link = document.createElement("a");
      link.href = image;
      link.download = `${formData.name || "card"}.jpg`;
      link.click();
    }
}


  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      <div className="w-full lg:w-1/4 flex flex-col border-r border-inherit h-[350px] lg:h-auto">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Editor</h1>
              <p className="text-sm text-muted-foreground">Create a new card</p>
            </div>
            <div className="flex gap-2">
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
                    <div className="flex justify-between items-center" key={index}>
                      <DropdownMenuItem
                        onSelect={() => {
                          setFormData({ ...card })
                          setIsEditing(true)
                        }}
                      >
                        {card.name || `Carta ${index + 1}`}
                      </DropdownMenuItem>
                      <Button size="icon" variant="ghost" className="h-5 w-5" onClick={() => deleteCard(card)}>
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="icon" variant="outline" onClick={handleDatabaseClick}>
                <Database className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TypeSelector
              value={formData.type}
              onChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
            />
            <div>
              <Label htmlFor="name">Name Pokemon</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
            </div>
            <div>
              <Label htmlFor="hp">Life points</Label>
              <Input type="number" name="HP" value={formData.HP} onChange={handleInputChange} placeholder='HP'/>
            </div>
            <ImageUrlInput
              value={formData.img}
              onChange={(value) => setFormData((prev) => ({ ...prev, img: value }))}
            />
            <AbilityInput formData={formData} setFormData={setFormData} />
            <AttackInput formData={formData} setFormData={setFormData} />
            <WeaknessInput formData={formData} setFormData={setFormData} />
            <ResistanceInput formData={formData} setFormData={setFormData} />
            <RetreatCostInput formData={formData} setFormData={setFormData} />
          </form>
        </div>
        <div className="border-t border-inherit p-4 bg-white">
          <div className="flex gap-4 justify-between">
            <Button type="submit" className="flex-1 items-center gap-2" onClick={handleSubmit}>
              <Save className="h-4 w-4" />
              {isEditing ? "Update and Save" : "Save in DB"}
            </Button>
            <Button variant="outline" className="flex-1 items-center gap-2" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              Scarica
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-3/4 flex items-center justify-center p-8 overflow-y-auto bg-gray-100">
        <div ref={cardRef} className="w-full max-w-sm lg:max-w-md xl:max-w-lg">
          <CardPreview formData={formData} />
        </div>
      </div>
    </div>
  )
}

