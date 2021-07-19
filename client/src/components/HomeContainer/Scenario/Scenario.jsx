import { Paper, Button } from '@material-ui/core'

export default function Scenario( {name, picture, status})
{
    return (
        <Paper>
            <h2>{name}</h2>
            <p>{status}</p>
            <img src={`/${picture}`} alt={picture} />
            <Button className="CheckButton">
                Start
            </Button>
        </Paper>
    )
}
