import confetti from "canvas-confetti"
import {Button} from "./components/ui/button"
import Title from "./components/Title"

function App() {

  const handleClick = () => {
    const custom = confetti.shapeFromText({ text: 'A'})
    confetti({
        // shapes: [custom],
        colors: ['#fff', '#000'],
        scalar: 2,
        particleCount: 300,
        spread: 360,
    });
  }

  function clickMe() {
    alert('Questa sera festa!');
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center bg-indigo-500 min-h-screen">
      <Title>Ciao mondo!</Title>
      <Button onClick={handleClick}>Auguri Luigi</Button>
      <Button onClick={clickMe}>Click me!</Button> 
    </div>
  )
}

export default App
