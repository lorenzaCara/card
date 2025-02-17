// components/AbilitySection.js

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

export function AbilityInput({ formData, setFormData }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="flex justify-between pb-2">
        <Label htmlFor="ability">Ability</Label>
        <Button type="button" variant="outline" className="p-2 h-6 w-6" onClick={() => setShow(true)}>
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {show ? (
        <>
          <Card className="p-4 space-y-4">
            <div className="flex justify-between">
              <Label htmlFor="abilityName">Name</Label>
              <Button type="button" variant="outline" className="p-2 h-6 w-6" onClick={() => setShow(false)}>
                <X className="h-5 w-5 text-red-500" />
              </Button>
            </div>
            <Input
              type="text"
              name="abilityName"
              value={formData.abilities.name || ""}
              maxLength={14}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  abilities: {
                    ...prev.abilities,
                    name: e.target.value,  
                  },
                }))
              }
              placeholder="Name ability"
            />
            <Label htmlFor="abilityDescription">Description</Label>
            <Input
              type="text"
              name="abilityDescription"
              value={formData.abilities.description || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  abilities: {
                    ...prev.abilities,
                    description: e.target.value,  
                  },
                }))
              }
              placeholder="Description ability"
            />
          </Card>
          {/* <Button className="mt-2 w-full">Aggiungi Abilità</Button> */}
        </>
      ) : (
        <Card className="p-4 text-center text-sm text-muted-foreground">There are no abilities</Card>
      )}
    </div>
  );
}
