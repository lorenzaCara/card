import { CheckCircle, Pen, Trash2, XCircle } from "lucide-react"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { useState } from "react"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"

const ListItem = ({item, onCheck, removeTodo, onItemChange}) => {
    
    const [isMod, setIsMod] = useState(false);
    const [newLabel, setNewLabel] = useState(item.label);

    const handleLabelSubmit = (e) => {
        e.preventDefault(); 
        onItemChange({
            ...item,
            label: newLabel,
        });
        setIsMod(false);
    }

    const reset = () => {
        setNewLabel(item.label);
        setIsMod(false);
    }

    return (
        <div key={item.id} className='flex items-center gap-2'>
            <Checkbox
                disabled={isMod}
                onCheckedChange={(value) => onCheck(item.id, value)}
                checked={item.checked} id={item.id}
            />
            {!isMod && (
                <>
                    <Label htmlFor={item.id}>{item.label}</Label>
                    {!item.checked && <Pen
                        className="ml-auto size-4 cursor-pointer text-blue-400 hover:text-blue-600"
                        onClick={() => setIsMod(!isMod)}    
                    />}
                    <Trash2
                        className={cn("size-4 ml-2 text-red-400 hover:text-red-600 cursor-pointer", item.checked && "ml-auto")}
                        onClick={() => removeTodo(item.id)}
                    />
                </>
            )}
            {isMod && (
                <form className="w-full relative" onSubmit={handleLabelSubmit}>
                    <Input
                        value={newLabel}
                        onChange={e => setNewLabel(e.target.value)}
                        onBlur={handleLabelSubmit}
                        autoFocus
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                        <button>
                            <CheckCircle className="size-4 text-green-500 hover:text-green-700 cursor-pointer" />
                        </button>
                        <XCircle onClick={reset} className="size-4 text-red-500 hover:text-red-700 cursor-pointer" />
                    </div>
                </form>
            )}
        </div>
    )
}

export default ListItem