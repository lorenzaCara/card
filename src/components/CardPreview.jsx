import { types } from "../data/pokemonTypes"

export function CardPreview({ formData }) {
  const selectedTypeCard = types.find((type) => type.value === formData.type)?.imgCard || "../cards/fire-card.webp"

  return (
    <div className="relative aspect-[63/88] w-full max-w-md mx-auto col-span-2">
      <img src={selectedTypeCard || "/placeholder.svg"} alt="Pokemon card preview" className="object-contain" />
      {formData && (
        <div>
          <p className="absolute top-[35px] left-9 font-bold">{formData.name}</p>
          <p className="absolute top-[35px] right-14">{formData.HP} HP</p>
          <div className="absolute top-[62px] left-[37px] w-[377px] h-[234px]">
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
          <div className="absolute top-[55%] left-10 flex items-start">
            <p className="font-bold">Ability:</p>
            <div className="ml-2 font-bold">
              {formData.abilityName}
            </div>
          </div>
          <div className="absolute top-[58%] left-10">
            {formData.abilityDescription}
          </div>
          <div className="absolute border top-[65%] border-black w-[380px] left-1/2 transform -translate-x-1/2" />
          <div className="absolute top-[70%] left-10 grid grid-cols-3 w-[380px]">
            <div className="flex gap-2">
              <p>Nome</p>
              
            </div>
            <p className="font-bold">{formData.attackName}</p>
            <div className="flex justify-end gap-2">
              <p className="font-bold">{formData.attackDamage}</p>
              <p className="font-bold">{formData.attackModifier}</p>
            </div>
          </div>
          <p className="absolute top-[74%] left-10">{formData.attackDescription}</p>
          {/* <p className="absolute top-[70%] left-12 font-bold">Attacks: {formData.attackName}</p> */}
          <div className="grid grid-cols-3">
            <p className="absolute top-[85.3%] left-[17%] font-bold">{formData.weakness}</p>
              {/* {formData.weakness.map((weak, index) => (
                <p key={index} className="font-light">{weak.type}</p>
              ))} */}
            <p className="font-bold absolute top-[85.3%] left-[44%] ">{formData.resistance}</p>
          </div>
        </div>
      )}
    </div>
  )
}

