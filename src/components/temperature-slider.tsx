import { Label } from "./ui/label"
import { Slider } from "./ui/slider"

interface ITemperatureSliderProps {
  temperature: number
  onValueChange: (temperature: number) => void
}

export const TemperatureSlider = (props: ITemperatureSliderProps) => {
  return (
    <div className="space-y-4">
      <Label htmlFor="temperature">Temperatura</Label>
      <Slider min={0} max={1} step={0.1} value={[props.temperature]} onValueChange={value => props.onValueChange(value[0])} />
      <span className="block text-xs text-muted-foreground italic leading-relaxed">
        Valores mais altos tendem a deixar o resultado mais criativo e
        com possíveis erros.
      </span>
    </div>
  )
}
