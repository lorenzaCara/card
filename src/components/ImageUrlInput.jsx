import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export function ImageUrlInput({ value, onChange }) {
  const [tempImg, setTempImg] = useState(value)

  const handleUpload = () => {
    onChange(tempImg)
  }

  return (
    <div>
      <div className="flex justify-between pb-2">
        <Label htmlFor="urlImg">URL</Label>
        <Button type="button" variant="outline" className="p-2 h-6 w-6" onClick={handleUpload}>
          <Upload className="h-5 w-5" />
        </Button>
      </div>
      <Textarea name="img" value={tempImg} onChange={(e) => setTempImg(e.target.value)} />
    </div>
  )
}

