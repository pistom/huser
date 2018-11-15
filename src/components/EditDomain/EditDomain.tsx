import * as React from 'react';
import { Toolbar, AppBar, withStyles, Grid, FormControl, TextField, InputLabel, Select, MenuItem, Button, Dialog, IconButton, Typography, Slide } from '@material-ui/core';
import ColorIcon from '@material-ui/icons/InvertColors';
import NoColorIcon from '@material-ui/icons/InvertColorsOff';
import CloseIcon from '@material-ui/icons/Close';
import { DisplayStyle, Color, Domain } from 'src/types';
import { HIGHLIGHT, FULL_HIDE, PARTIAL_HIDE, COLOR_1, COLOR_2, COLOR_3 } from 'src/constants';

interface Props {
  classes: any;
  open: boolean;
  domain: Domain;
  editDomain: (domainName: string, display: DisplayStyle, color?: Color) => void;
  closeEditionHandle: () => void;
}

interface State {
  domainName: string;
  color: number;
  display: number;
}

const styles = {
  root: {
    flexGrow: 1,
    padding: 8
  },
  grow: {
    flexGrow: 1,
  },
  colorIcon: {
    marginTop: -6,
    marginBottom: -6
  },
  flex: {
    flex: 1,
  },
};

function Transition (props: any) {
  return <Slide direction="right" {...props} />;
}

class EditDomain extends React.Component<Props, State> {

  constructor (props: any) {
    super(props);
    this.state = {
      domainName: '',
      color: 0,
      display: 2,
    };

    this.handleDomainNameChange = this.handleDomainNameChange.bind(this);
    this.handleDisplayChange = this.handleDisplayChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps (nextProps: any) {
    if (this.props.domain !== nextProps.domain) {
      if (nextProps.domain !== null) {
        let display: number = 0;
        switch (nextProps.domain.display) {
          case HIGHLIGHT: display = 1; break;
          case PARTIAL_HIDE: display = 2; break;
          case FULL_HIDE: display = 3; break;
        }
        let color: number = 0;
        switch (nextProps.domain.color) {
          case COLOR_1: color = 1; break;
          case COLOR_2: color = 2; break;
          case COLOR_3: color = 3; break;
        }
        this.setState({
          domainName: nextProps.domain.domainName,
          color: color,
          display: display,
        });
      } else {
        this.setState({
          domainName: '',
          color: 0,
          display: 2,
        });
      }
    }
  }

  handleDomainNameChange (event: any) {
    this.setState({ domainName: event.target.value });
  }

  handleDisplayChange (event: any) {
    this.setState({ display: parseInt(event.target.value, 10) });
  }

  handleColorChange (event: any) {
    this.setState({ color: parseInt(event.target.value, 10) });
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

    if (this.state.color === 0) {
      this.props.editDomain(this.state.domainName, display);
    } else {
      this.props.editDomain(this.state.domainName, display, color);
    }
    this.props.closeEditionHandle();
  }

  handleClose = () => {
    this.props.closeEditionHandle();
  }

  render () {
    const classes = this.props.classes;
    return (
      <Dialog
        fullScreen
        open={this.props.open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Sound
            </Typography>
            <Button color="inherit" onClick={this.handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <form className={classes.root} autoComplete="off" onSubmit={this.handleSubmit}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
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
            <Grid item xs={8}>
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
            <Grid item xs={4}>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Color</InputLabel>
                <Select
                  value={this.state.color}
                  onChange={this.handleColorChange}
                >
                  <MenuItem value="0"><NoColorIcon className={classes.colorIcon} style={{ color: '#607D8B' }} /></MenuItem>
                  <MenuItem value="1"><ColorIcon className={classes.colorIcon} style={{ color: '#f50057' }} /></MenuItem>
                  <MenuItem value="2"><ColorIcon className={classes.colorIcon} style={{ color: '#8BC34A' }} /></MenuItem>
                  <MenuItem value="3"><ColorIcon className={classes.colorIcon} style={{ color: '#03A9F4' }} /></MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    );
  }
}

export default withStyles(styles)(EditDomain);