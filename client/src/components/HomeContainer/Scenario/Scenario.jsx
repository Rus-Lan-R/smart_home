import { Paper, Button } from '@material-ui/core'

export default function Scenario({item}) {
    return (
      <Paper>
            <h2>{item.name}</h2>
            <p>{item.status? 'started':''}</p>
            <img src={`/${item.picture}`} alt={item.picture} />
            <Button className="CheckButton">
                Start
            </Button>
        </Paper>
    )
}
