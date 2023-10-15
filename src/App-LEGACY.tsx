import { useEffect, useReducer, useState } from 'react'
import './App.css'

function App() {
  const [number, setNumber] = useState<number>(0)
  const [isLoading, setisLoading] = useState<boolean>(true)
  const [error, seterror] = useState<string>("")
  const [key, forceRefetch] = useReducer((x) => x + 1, 0)

  const getRandomNumberFromAPI = async (): Promise<number> => {
    const rest = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')

    const numberString = await rest.text()

    return +numberString

  }

  useEffect(() => {
    getRandomNumberFromAPI()
      .then(num => setNumber(num))
      .catch(err => seterror(err.message))
  }, [key])

  useEffect(() => {
    const loading = number ? false : true

    setisLoading(loading)
  }, [number])

  useEffect(() => {
    const err = error ? false : true

  }, [error])




  return (
    <div className="App">
      {
        isLoading
          ? (<h2>Cargando</h2>)
          : (<h2>Numero aleatorio: {number}</h2>)
      }

      {
        !isLoading && error && (<h2>Error en la peticion</h2>)
      }

      <button onClick={forceRefetch} disabled={isLoading}>
        Nuevo numero
      </button>

    </div>
  )
}

export default App
