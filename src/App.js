import { useState, useEffect } from 'react'
import classes from './App.module.css'
import Products from './components/Products'
function App() {
  const [data, setData] = useState([])
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const fetchDataHandler = async () => {
      const res = await fetch(
        'https://img.scupio.com/gym/interview_api/test.json',
      )
      const resultData = await res.json()
      const dataArray = resultData['products']
      setData(dataArray)
    }
    fetchDataHandler()
  }, [])
  //////////////
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <div className={classes.App}>
      <div className={classes.header}>
        <h2>The latest.</h2>
        <span>Take a look at what's new, right now.</span>
      </div>
      <Products data={data} width={width} />
      <div>{width}</div>
    </div>
  )
}

export default App
