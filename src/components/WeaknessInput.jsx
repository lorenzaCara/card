import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { types } from "@/data/pokemonTypes";
import { Input } from "./ui/input";

export function WeaknessInput({ formData, setFormData }) {

  const handleTypeSelect = (selectedType) => {
    const choosenType = types.find((t) => t.value === selectedType);
    const imgSrc = choosenType ? choosenType.imgSrc : "";

    setFormData((prev) => ({
      ...prev,
      weaknesses: {
        ...prev.weaknesses,
        selectedType: selectedType,   
        type: imgSrc,  
      }
    }));
  };

  const handleModifierClick = (modifier, e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      weaknesses: {
        ...prev.weaknesses,
        modifier: prev.attacks.modifier === modifier ? "" : modifier, 
      },
    }));
  };

  return (
    <div className="space-y-4">
      <Label>Weakness</Label>
      <Card className="p-4 space-y-4">
        <div>
          <Label>Type</Label>
          <Select value={formData.weaknesses.selectedType || ""} onValueChange={handleTypeSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
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
          <Label>Value</Label>
          <div className="flex items-center gap-2 mt-2">
            <Input
              type="number"
              className="w-full"
              value={formData.weaknesses.value || ""}
              min="0"
              max='5'
              onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    weaknesses: {
                      ...prev.weaknesses,
                      value: e.target.value,  
                    },
                }))
              }
            />
            <Button
              variant={formData.weaknesses.modifier === "+" ? "default" : "outline"}
              onClick={(e) => handleModifierClick("+", e)}
            >
              <p className="text-lg">+</p>
            </Button>
            <Button
              variant={formData.weaknesses.modifier === "-" ? "default" : "outline"}
              onClick={(e) => handleModifierClick("-", e)}
            >
              <p className="text-lg">-</p>
            </Button>
            <Button
              variant={formData.weaknesses.modifier === "x" ? "default" : "outline"}
              onClick={(e) => handleModifierClick("x", e)}
            >
              <p className="text-lg">x</p>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
