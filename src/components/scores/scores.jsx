import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export function Scores(){
    return(
        <div>
     <Grid container spacing={2}>
  <Grid item xs={8}>
    <Item>Date</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Time</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Language</Item>
  </Grid>
  <Grid item xs={8}>
    <Item>Score</Item>
  </Grid>
</Grid>
        </div>
    );
}