import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const buttonClick = async (color) => {
	await fetch(`http://192.168.1.148:3001/api/rpi/${color}`);
};

const Buttons = () => {
	return (
		<ButtonGroup color="primary" aria-label="outlined primary button group">
			<Button onClick={(e) => buttonClick(e.target.innerText.toLowerCase())}>Red</Button>
			<Button onClick={(e) => buttonClick(e.target.innerText.toLowerCase())}>Green</Button>
			<Button onClick={(e) => buttonClick(e.target.innerText.toLowerCase())}>Blue</Button>
		</ButtonGroup>
	);
};

export default Buttons;
