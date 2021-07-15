
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const buttonClick = async(color) =>{

  const requestToRPI = await fetch(`http://192.168.1.148:3001/api/rpi/${color}`)

  const responseFromRPI = await requestToRPI.json()

  console.log(responseFromRPI);

}

const Buttons = () => {

  return (
  <ButtonGroup color="primary" aria-label="outlined primary button group">
  <Button onClick={(e)=>buttonClick(e.target.innerText.toLowerCase())}>Red</Button>
  <Button onClick={(e)=>buttonClick(e.target.innerText.toLowerCase())} >Green</Button>
  <Button onClick={(e)=>buttonClick(e.target.innerText.toLowerCase())}>Blue</Button>
</ButtonGroup>
)

}

export default  Buttons 
