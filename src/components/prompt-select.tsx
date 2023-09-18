import { useEffect, useState } from "react"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { api } from "@/lib/axios"

type Prompt = {
  id: string
  template: string
  title: string
}

interface IPromptSelectProps {
  onPromptSelected: (template: string) => void
}

export const PromptSelect = (props: IPromptSelectProps) => {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null)

  useEffect(() => {
    api.get('/prompts').then(response => setPrompts(response.data)).catch(error => console.log(error))
  }, [])

  const handlePromptSelected = (promptId: string) => {
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

    if (!selectedPrompt) {
      return
    }

    props.onPromptSelected(selectedPrompt.template)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="prompt">Prompt</Label>
      <Select onValueChange={handlePromptSelected}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um prompt..." />
        </SelectTrigger>
        <SelectContent>
          {prompts?.map(prompt => (
            <SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>
          ))}

        </SelectContent>
      </Select>
    </div>
  )
}
