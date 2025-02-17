import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { types } from "@/data/pokemonTypes";

export function RetreatCostInput({ formData, setFormData }) {

  const handleTypeSelect = (type) => {
    setFormData((prev) => {
      let retreatArray = prev.retreat || [];

      if (retreatArray.length >= 3) {
        retreatArray = [...retreatArray.slice(1), type.imgSrc];
      } else {
        retreatArray = [...retreatArray, type.imgSrc];
      }

      return {
        ...prev,
        retreat: retreatArray,
      }
    });
  };

  return (
    <div className="space-y-4">
      <Label>Costo Ritiro</Label>
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 overflow-x-auto flex-wrap">
            {types.map((type, i) => (
              <div
                key={i}
                className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
                onClick={() => handleTypeSelect(type)}
              >
                <img src={type.imgSrc} alt={type.value} />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
