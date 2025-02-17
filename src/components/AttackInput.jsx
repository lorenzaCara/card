import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { types } from "@/data/pokemonTypes";

export function AttackInput({ formData, setFormData }) {
  const [show, setShow] = useState(false);

  const handleModifierClick = (modifier, e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      attacks: {
        ...prev.attacks,
        modifier: prev.attacks.modifier === modifier ? "" : modifier, 
      },
    }));
  };

  const handleTypeSelect = (type) => {
    setFormData((prev) => {
      let typesArray = prev.attacks.types || [];
  
      // Se il tipo è già presente, lo rimuove
      if (typesArray.includes(type.imgSrc)) {
        return {
          ...prev,
          attacks: {
            ...prev.attacks,
            types: typesArray.filter((t) => t !== type.imgSrc),
          },
        };
      }
  
      if (typesArray.length >= 3) {
        typesArray = [...typesArray.slice(1), type.imgSrc]; //per sostituire l'ultimo
      } else {
        typesArray = [...typesArray, type.imgSrc]; //aggiunge nuovo elemento all'array
      }
  
      return {
        ...prev,
        attacks: {
          ...prev.attacks,
          types: typesArray,
        },
      };
    });
  };
  
  
  const handleSymbolClick = (modifier, e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      attacks: {
        ...prev.attacks,
        symbol: prev.attacks.symbol === modifier ? "" : modifier,
      },
    }));
  };

  return (
    <div>
      <div className="flex justify-between pb-2">
        <Label htmlFor="Attacks">Attacks</Label>
        <Button
          type="button"
          variant="outline"
          className="p-2 h-6 w-6"
          onClick={() => setShow(true)}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {show ? (
        <Card className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="Name">Name</Label>
            <Button
              type="button"
              variant="ghost"
              className="p-2 h-6 w-6"
              onClick={() => setShow(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <Input
            type="text"
            value={formData.attacks.name || ""}
            maxLength={14}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                attacks: {
                  ...prev.attacks,
                  name: e.target.value,  
                },
              }))
            }
            placeholder="Name attack"
          />

          <div>
            <Label htmlFor="damage">Damage</Label>
            <div className="flex items-center gap-2 mt-2">
              <Input
                type="number"
                value={formData.attacks.damage || ""}
                className="w-full"
                min="0"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    attacks: {
                      ...prev.attacks,
                      damage: e.target.value,  
                    },
                }))
              }
              />
              <Button
                variant={formData.attacks.modifier === "+" ? "default" : "outline"}
                onClick={(e) => handleModifierClick("+", e)}
              >
                <p className="text-lg">+</p>
              </Button>
              <Button
                variant={formData.attacks.modifier === "-" ? "default" : "outline"}
                onClick={(e) => handleModifierClick("-", e)}
              >
                <p className="text-lg">-</p>
              </Button>
              <Button
                variant={formData.attacks.modifier === "x" ? "default" : "outline"}
                onClick={(e) => handleModifierClick("x", e)}
              >
                <p className="text-lg">x</p>
              </Button>
            </div>
          </div>

          <Label htmlFor="Description">Description</Label>
          <Textarea
            value={formData.attacks.description || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                attacks: {
                  ...prev.attacks,
                  description: e.target.value,  
                },
              }))
            }
            placeholder="Description attack"
          />

          <div>
            <Label>Energy</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {types.map((energy) => (
                <Button
                  key={energy.type}
                  type="button"
                  variant="outline"
                  className="p-2 h-8 w-8 rounded-full"
                  size="icon"
                  onClick={() => handleTypeSelect(energy)}
                >
                  <img src={energy.imgSrc} className="w-8" />
                </Button>
              ))}
              <Button
                variant={formData.attacks.symbol === "+" ? "default" : "outline"}
                onClick={(e) => handleSymbolClick("+", e)}
                className="p-2 h-8 w-8 rounded-full"
                size="icon"
              >
                <p className="text-lg">+</p>
              </Button>
              <Button
                variant={formData.attacks.symbol === "-" ? "default" : "outline"}
                onClick={(e) => handleSymbolClick("-", e)}
                className="p-2 h-8 w-8 rounded-full"
                size="icon"
              >
                <p className="text-lg">-</p>
              </Button>
              <Button
                variant={formData.attacks.symbol === "x" ? "default" : "outline"}
                onClick={(e) => handleSymbolClick("x", e)}
                className="p-2 h-8 w-8 rounded-full"
                size="icon"
              >
                <p className="text-lg">x</p>
              </Button>
            </div>
          </div>

          {/* <Button className="w-full">
            + Aggiungi attacco
          </Button> */}
        </Card>
      ) : (
        <Card className="p-4 text-center text-sm text-muted-foreground">
          There are no attacks
        </Card>
      )}
    </div>
  );
}
