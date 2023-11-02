import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function ChatBox(prop) {
  return (
    <div>
      <Box height={500}></Box>
      <Box
        display={{ base: "flex", md: "flex" }}
        alignItems="center"
        p={5}
        bg="white"
        w={{ base: "100%", md: "68%" }}
        borderRadius="lg"
      >
        <Grid container>
          <Grid item xs={11}>
            <TextField fullWidth id="fullWidth" />
          </Grid>
          <Grid item xs>
            <Button variant="contained" onClick={prop.handleClick}>Send</Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

