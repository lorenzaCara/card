import { types } from "@/data/pokemonTypes"

export function CardPreview({ formData }) {
  const selectedTypeCard = types.find((type) => type.value === formData.type)?.imgCard || "/cards/fire-card.webp"

  return (
    <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: "63/88" }}>
      <img
        src={selectedTypeCard || "/placeholder.svg"}
        alt="Pokemon card preview"
        className="w-full h-full object-contain"
      />
      {formData && (
        <div className="absolute inset-0">
          <p className="absolute top-[4.8%] left-[16%] lg:text-xl text-base font-bold">{formData.name}</p>
          <p className="absolute top-[4.8%] right-[13%] lg:text-xl text-base">{formData.HP} HP</p>
          <div className="absolute top-[10%] left-[8.6%] w-[84%] h-[37.8%]">
            {formData.img ? (
              <img
                src={formData.img || "/placeholder.svg"}
                alt={formData.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="bg-white w-full h-full"></div>
            )}
          </div>
          <div className="absolute top-[51%] left-[9%] w-[82%] grid grid-cols-3">
            <div className="font-bold lg:text-lg text-base">Ability:</div>
            <p className="font-bold lg:text-lg text-base text-center">{formData.abilities.name}</p>
          </div>
          <div className="absolute top-[55%] left-[9%] w-[82%] text-base max-w-md break-words line-clamp-2">
            {formData.abilities.description}
          </div>
          <div className="absolute top-[65%] left-[9%] w-[82%] border-t border-black" />
          <div className="absolute top-[68%] left-[9%] w-[82%] grid grid-cols-3 lg:text-lg text-base">
            <div className="grid grid-cols-3">
              <div className="flex gap-1 w-full items-center pt-1 col-span-1">
                {Array.isArray(formData.attacks.types) &&
                  formData.attacks.types.map((type, index) => (
                    <img
                      key={index}
                      src={type || "/placeholder.svg"}
                      className="w-5 md:w-5 h-5 md:h-5"
                      alt="Attack type"
                    />
                  ))}
              </div>
              <div className="text-center col-span-2">
                <p className="font-bold">{formData.attacks.symbol}</p>
              </div>
            </div>
            <p className="font-bold">{formData.attacks.name}</p>
            <div className="flex justify-end gap-1">
              <p className="font-bold">{formData.attacks.damage}</p>
              <p className="font-bold">{formData.attacks.modifier}</p>
            </div>
          </div>
          <p className="absolute top-[74%] left-[9%] w-[82%] text-base max-w-md break-words line-clamp-3">
            {formData.attacks.description}
          </p>
          <div className="absolute lg:bottom-[10.6%] bottom-[10.2%] left-[16%] w-[82%]">
            <div className="flex gap-1 items-center">
              {formData.weaknesses.type && (
                <img
                  src={formData.weaknesses.type || "/placeholder.svg"}
                  className="lg:w-4 lg:h-4 md:w-4 md:h-4 w-3 h-3 p-0"
                  alt="Weakness type"
                />
              )}
              <p className="font-bold">{formData.weaknesses.value}</p>
              <p className="font-bold">{formData.weaknesses.modifier}</p>
            </div>
          </div>
          <div className="absolute lg:bottom-[10.6%] bottom-[10.2%] lg:left-[7%] md:left-[7%] left-[8%] w-[82%]">
              <div className="flex items-center gap-1 justify-center">
                {formData.resistances.type && (
                  <img
                    src={formData.resistances.type || "/placeholder.svg"}
                    className="lg:w-4 lg:h-4 md:w-4 md:h-4 w-3 h-3 p-0"
                    alt="Resistance type"
                  />
                )}
                <p className="font-bold ">{formData.resistances.value}</p>
                <p className="font-bold">{formData.resistances.modifier}</p>
              </div>
            </div>
            <div className="absolute bottom-[11.2%] lg:left-[2%] left-[2%] w-[82%]">
              <div className="flex items-center gap-1 justify-end">
                {Array.isArray(formData.retreat) &&
                  formData.retreat.map((retreatType, index) => (
                    <img
                      key={index}
                      src={retreatType || "/placeholder.svg"}
                      className="lg:w-4 lg:h-4 md:w-4 md:h-4 w-3 h-3 p-0"
                      alt="Retreat cost"
                    />
                  ))}
              </div>
            </div>
          
        </div>
      )}
    </div>
  )
}


