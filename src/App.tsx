import { Button } from "./components/ui/button";
import { Github, Wand2 } from "lucide-react";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { VideoInputForm } from "./components/video-input-form";
import { PromptSelect } from "./components/prompt-select";
import { ModelSelect } from "./components/model-select";
import { TemperatureSlider } from "./components/temperature-slider";
import { useState } from "react";
import { useCompletion } from 'ai/react'

export const App = () => {
  const [temperature, setTemperature] = useState<number>(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)


  const { input, setInput, handleInputChange, handleSubmit, completion, isLoading } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId, temperature,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const handlePromptSelected = (template: string) => setInput(template)
  const handleTemperature = (temperature: number) => setTemperature(temperature)
  const handleVideoId = (videoId: string) => setVideoId(videoId)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido com ❤ no NLW
          </span>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
        </div>
      </div>

      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              placeholder="Inclua o prompt para a IA..."
              className="resize-none p-4 leading-relaxed"
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              placeholder="Resultado gerado pela IA..."
              readOnly
              className="resize-none p-4 leading-relaxed"
              value={completion}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a variável&nbsp;
            <code className="text-violet-400">{"{transcription}"}</code> no seu
            prompt para adicionar o conteúdo da descrição do vídeo selecionado.
          </p>
        </div>

        <aside className="w-80 space-y-6">
          <VideoInputForm onVideoUploaded={handleVideoId} />

          <Separator />

          <form className="space-y-6" onSubmit={handleSubmit}>
            <PromptSelect onPromptSelected={handlePromptSelected} />
            <ModelSelect />

            <Separator />

            <TemperatureSlider temperature={temperature} onValueChange={handleTemperature} />

            <Separator />

            <Button disabled={isLoading} type="submit" className="w-full">
              Executar
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
};
