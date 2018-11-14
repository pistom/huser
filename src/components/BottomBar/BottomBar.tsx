import * as React from 'react';
import { Toolbar, AppBar, withStyles, Grid, FormControl, TextField, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import ColorIcon from '@material-ui/icons/InvertColors';
import NoColorIcon from '@material-ui/icons/InvertColorsOff';
import AddIcon from '@material-ui/icons/Add';
import { DisplayStyle, Color } from 'src/types';
import { HIGHLIGHT, FULL_HIDE, PARTIAL_HIDE, COLOR_1, COLOR_2, COLOR_3 } from 'src/constants';

interface Props {
  classes: any;
  addDomain: (domainName: string, display: DisplayStyle, color?: Color) => void;
}

interface State {
  domainName: string;
  fullHide: boolean;
  color: number;
  display: number;
}

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  colorIcon: {
    marginTop: -6,
    marginBottom: -6
  }
};

class BottomBar extends React.Component<Props, State> {

  constructor (props: any) {
    super(props);
    this.state = {
      domainName: '',
      fullHide: false,
      color: 0,
      display: 2
    };

    this.handleDomainNameChange = this.handleDomainNameChange.bind(this);
    this.handleDisplayChange = this.handleDisplayChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDomainNameChange (event: any) {
    this.setState({domainName: event.target.value});
  }

  handleDisplayChange (event: any) {
    this.setState({display: parseInt(event.target.value, 10)});
  }

  handleColorChange (event: any) {
    this.setState({color: parseInt(event.target.value, 10)});
  }

  handleSubmit (event: any) {
    event.preventDefault();

    let display: DisplayStyle = PARTIAL_HIDE;
    switch (this.state.display) {
      case 1: display = HIGHLIGHT; break;
      case 2: display = PARTIAL_HIDE; break;
      case 3: display = FULL_HIDE; break;
    }

    let color: Color = COLOR_1;
    switch (this.state.color) {
      case 1: color = COLOR_1; break;
      case 2: color = COLOR_2; break;
      case 3: color = COLOR_3; break;
    }

    if(this.state.color === 0) {
      this.props.addDomain(this.state.domainName, display);
    } else {
      this.props.addDomain(this.state.domainName, display, color);
    }
  }

  render () {
    const classes = this.props.classes;
    return (
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar style={{paddingBottom: '10px'}}>
          <form className={classes.root} autoComplete="off" onSubmit={this.handleSubmit}>
            <Grid container spacing={8}>
              <Grid item xs={7}>
                <FormControl fullWidth>
                  <TextField
                    label="Domain"
                    id="margin-none"
                    className={classes.textField}
                    value={this.state.domainName}
                    onChange={this.handleDomainNameChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3} sm={2}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="age-simple">Style</InputLabel>
                  <Select
                    value={this.state.display}
                    onChange={this.handleDisplayChange}
                  >
                    <MenuItem value="1">Highlighted</MenuItem>
                    <MenuItem value="2" selected>Transparent</MenuItem>
                    <MenuItem value="3">Hidden</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2} sm={1}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="age-simple">Color</InputLabel>
                  <Select
                    value={this.state.color}
                    onChange={this.handleColorChange}
                  >
                    <MenuItem value="0"><NoColorIcon className={classes.colorIcon} style={{color: '#607D8B'}} /></MenuItem>
                    <MenuItem value="1"><ColorIcon className={classes.colorIcon} style={{color: '#f50057'}} /></MenuItem>
                    <MenuItem value="2"><ColorIcon className={classes.colorIcon} style={{color: '#8BC34A'}} /></MenuItem>
                    <MenuItem value="3"><ColorIcon className={classes.colorIcon} style={{color: '#03A9F4'}} /></MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl margin="dense" fullWidth className={classes.formControl}>
                  <Button type="submit" variant="raised" size="small" color="secondary" className={classes.button}>
                    Add <AddIcon />
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </form>

        </Toolbar>

      </AppBar>
    );
  }
}

export default withStyles(styles)(BottomBar);
