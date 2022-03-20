import classes from './Products.module.css'
import { useState, useEffect, useReducer } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import ProductItem from './ProductItem'

const Products = (props) => {
  const step = 420
  const spaceEnd = 50
  //////////////////////
  const [data, setData] = useState([])
  const [isLeft, setIsLeft] = useState(true)
  const [isRight, setIsRight] = useState(false)
  ///
  const MoveOptionReducer = (state, action) => {
    const spaceStart = Math.max(22, (action - 980) / 2)
    const totalWidth = action - spaceStart - spaceEnd
    const normalMove = Math.floor(data.length - totalWidth / step)
    const finalStep = (data.length - normalMove) * step - totalWidth
    return { normalMove, finalStep, spaceStart }
  }
  const [moveOption, dispatchMoveOption] = useReducer(MoveOptionReducer, {
    normalMove: 0,
    finalStep: 0,
    spaceStart: 0,
  })

  /* move step counting process:
  sps = spaceStart, spe = spaceEnd, ww = windowInnerWidth item = item number
  step = 420px, n = normal_move, fStep = final step pixel
  n = (item - (ww - sps - spe)/step).toFixed()
  fStep = item * step - (ww - sps + spe)
  */

  const moveRightHandler = () => {
    console.log(data)
    setIsLeft(false)
    // check if the last move
    const lastPosition = data[data.length - 1].pos
    // console.log(lastPosition)
    // console.log(props.width - spaceEnd - 420)
    //
    let step
    if (
      lastPosition < props.width - spaceEnd &&
      lastPosition > props.width - spaceEnd - 420
    ) {
      // last step, set isRight to true
      console.log('Last move!')
      console.log(lastPosition)
      console.log(`Need to move to ${props.width - spaceEnd - 420}`)
      step = lastPosition - (props.width - spaceEnd - 420)
      setIsRight(true)
    } else {
      step = 420
    }
    // console.log(step)
    const newData = data.map((obj) => {
      const item = Object.assign({}, obj)
      item.pos -= step
      return item
    })
    // console.log(newData)
    setData(newData)
    // check boundary
  }
  const moveLeftHandler = () => {
    console.log(data)
    setIsRight(false)
    // check if the last move
    const firstPosition = data[0].pos
    console.log(firstPosition)
    //
    let step
    //  -box-width + spaceStart  < x < spaceStart
    if (
      firstPosition < moveOption.spaceStart &&
      firstPosition > moveOption.spaceStart - 420
    ) {
      // last step, set isRight to true
      console.log('Last move!')
      console.log(firstPosition)
      console.log(`Need to move to ${moveOption.spaceStart}`)
      step = moveOption.spaceStart - firstPosition
      setIsLeft(true)
    } else {
      step = 420
    }
    console.log(step)
    const newData = data.map((obj) => {
      const item = Object.assign({}, obj)
      item.pos += step
      return item
    })
    console.log(newData)
    setData(newData)
  }
  ////////////////
  useEffect(() => {
    console.log('New width is: ', props.width)
    // setSps(Math.max(22, props.width / 2 - 490))
    dispatchMoveOption(props.width)
    // check hide
    if (data.length > 0) {
      const lastPosition = data[data.length - 1].pos
      console.log(lastPosition)
      console.log(props.width - spaceEnd - 420)
      if (lastPosition > props.width - spaceEnd - 420) {
        setIsRight(false)
      }
    }
  }, [props.width])
  /////////////// shift handler!
  useEffect(() => {
    console.log('shift!')
    const dataShift = data.map((obj) => {
      const item = Object.assign({}, obj)
      // console.log(
      //   `Current pos: ${item.pos}, current spaceStart:${item.spaceStart}`,
      // )
      item.pos = item.pos + (moveOption.spaceStart - item.spaceStart)
      // console.log(
      //   `New pos: ${item.pos}, new spaceStart:${moveOption.spaceStart}`,
      // )
      item.spaceStart = moveOption.spaceStart
      // item.pos = moveOption.spaceStart + index * 420
      // item.pos = 400 + index * 420
      return item
    })
    setData(dataShift)
  }, [moveOption])
  ///////////////
  useEffect(() => {
    const dataWithId = props.data.map((item, index) => {
      item.id = index
      // item.pos = index * 420
      item.spaceStart = moveOption.spaceStart
      // console.log(moveOption.spaceStart)
      item.pos = moveOption.spaceStart + index * 420
      // item.pos = 400 + index * 420
      return item
    })
    console.log(dataWithId)
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
          <FaChevronLeft />
        </button>
      )}
      {!isRight && (
        <button
          className={`${classes.btn} ${classes.right}`}
          onClick={moveRightHandler}
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  )
}
export default Products
