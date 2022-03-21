import classes from './Products.module.css'
import { useState, useEffect } from 'react'

import ProductItem from './ProductItem'

const Products = (props) => {
  const spaceEnd = 50
  ///
  const [data, setData] = useState([])
  const [isLeft, setIsLeft] = useState(true)
  const [isRight, setIsRight] = useState(false)
  const [spaceStart, setSpaceStart] = useState(22)
  ///
  const moveRightHandler = () => {
    setIsLeft(false)
    // check if the last move
    const lastPosition = data[data.length - 1].pos
    let step
    if (
      lastPosition <= props.width - spaceEnd &&
      lastPosition >= props.width - spaceEnd - 420
    ) {
      // last step, set isRight to true
      step = lastPosition - (props.width - spaceEnd - 420)
      setIsRight(true)
    } else {
      step = 420
    }
    const newData = data.map((obj) => {
      const item = Object.assign({}, obj)
      item.pos -= step
      return item
    })
    setData(newData)
    // check boundary
  }
  const moveLeftHandler = () => {
    setIsRight(false)
    // check if the last move
    const firstPosition = data[0].pos
    //
    let step
    //  -box-width + spaceStart  < x < spaceStart
    if (firstPosition <= spaceStart && firstPosition >= spaceStart - 420) {
      // last step, set isLeft to true
      step = spaceStart - firstPosition
      setIsLeft(true)
    } else {
      step = 420
    }
    const newData = data.map((obj) => {
      const item = Object.assign({}, obj)
      item.pos += step
      return item
    })
    setData(newData)
  }
  ////////////////
  useEffect(() => {
    const newSpaceStart = Math.max(22, (props.width - 980) / 2)
    setSpaceStart(newSpaceStart)
  }, [props.width])
  /////////////// shift handler!
  useEffect(() => {
    setData((pre) => {
      const dataShift = pre.map((obj) => {
        const item = Object.assign({}, obj)
        if (isRight) {
          item.pos = item.pos + (spaceStart - item.spaceStart) * 2
        } else {
          item.pos = item.pos + (spaceStart - item.spaceStart)
        }
        item.spaceStart = spaceStart
        return item
      })
      return dataShift
    })
  }, [spaceStart, isRight])
  ///////////////
  useEffect(() => {
    const dataWithId = props.data.map((item, index) => {
      item.id = index
      const defaultSpaceStart = Math.max(22, (window.innerWidth - 980) / 2)
      item.spaceStart = defaultSpaceStart
      item.pos = defaultSpaceStart + index * 420
      return item
    })
    setData(dataWithId)
  }, [props.data])

  return (
    <div className={classes.box}>
      {data.map((item) => {
        return <ProductItem key={item.id} data={item} />
      })}
      {!isLeft && (
        <button
          className={`${classes.btn} ${classes.left}`}
          onClick={moveLeftHandler}
        >
          <div className={classes.btnLogo}>{'<'}</div>
        </button>
      )}
      {!isRight && (
        <button
          className={`${classes.btn} ${classes.right}`}
          onClick={moveRightHandler}
        >
          <div className={classes.btnLogo}>{'>'}</div>
        </button>
      )}
    </div>
  )
}
export default Products
