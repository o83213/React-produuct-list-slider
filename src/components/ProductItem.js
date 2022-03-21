import classes from './ProductItem.module.css'
import { useState, useEffect } from 'react'
const ProductItem = (props) => {
  const [data, setData] = useState(props.data)
  useEffect(() => {
    setData(props.data)
  }, [props.data])
  return (
    <div className={classes.box} style={{ left: data.pos }}>
      <div className={classes.tytle}>{data.name}</div>
      <div className={classes.description}>Some Lorem discription</div>
      <div className={classes.content}>
        {`Now in ${data.color}. Only $${data.price}!`}
      </div>
      <div className={classes.pic}>
        <div>I am a pic url</div>
      </div>
    </div>
  )
}
export default ProductItem
