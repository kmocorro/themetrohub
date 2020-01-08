import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'



const StyledButton = withStyles({
    root: {
        //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: 'linear-gradient(45deg, #C96BFE 30%, #53E9FF 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 35,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, 0.02)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

const StyledDialog = withStyles({
    paper: {
        backgroundColor: '#33333b'
    }
})(Dialog);

const TextFieldDarkMode = withStyles({
    root: {
        '& input': {
            color: 'wheat',
        },
        '& label': {
            color: 'white',
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'gray',
            },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
            },
        },
        '& .MuiInputBase-root': {
            color: 'wheat',
        }
    }
})(TextField);

export default function ResponsiveDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleClose = props.handleClose;
    const open = props.open;
    
    const [ qualCategory, setQualCategory ] = useState('SMAT');
    const [ qualQty, setQualQty ] = useState(50);
    const [ qualQtyError, setQualQtyError ] = useState(false)
    const [ qualQtyErrorMessage, setQualQtyErrorMessage ] = useState('')
    const handleQualChange = e => {
        setQualCategory(e.target.value)
    }
    const handleQualQtyChange = e => {
        setQualQty(e.target.value);
    }

    useEffect(() => {
        if (qualQty < 50) {
            setQualQtyError(true);
            setQualQtyErrorMessage('50 minimum per transaction')
        } else if(qualQty > 50000) {
            setQualQtyError(true);
            setQualQtyErrorMessage('You have reached the limit. (50000 max per transaction)')
        } else if(isNaN(qualQty)) {
            setQualQtyError(true);
            setQualQtyErrorMessage('Incorrect quantity.')
        } else {
            setQualQtyError(false);
            setQualQtyErrorMessage('')
        }
    })

    async function handleClickSubmit(e) {
        const url = 'http://dev-metaspf401.sunpowercorp.com:8080/api/mh/addinventory';

        handleClose()
        props.setToggle(!props.toggle)
        try {
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    qual: qualCategory,
                    qty: Number(qualQty),
                    mode: 'add',
                    status: 'approved',
                    username: props.user.username
                })
            });


            if(response.status === 200){
                let message = await response.json();
                console.log(message);
            }

        } catch (error) {

            console.log(error, ' This is an error...');
        }
    }


    return (
        <StyledDialog
            open={open}
            fullScreen={fullScreen}
            aria-labelledby="responsive-dialog-title"
            onClose={handleClose}
        >
            <DialogTitle >
                <Typography color="primary" variant="inherit" style={{fontFamily: 'Roboto Condensed'}}>Add Inventory</Typography>
            </DialogTitle>
            <DialogContent  >
                <DialogContentText style={{fontFamily: 'Roboto Condensed'}} color="primary"  >
                    You are about to "add" the current Inventory.
                </DialogContentText>
                <TextFieldDarkMode
                    margin="normal"
                    required
                    fullWidth
                    value={qualCategory}
                    onChange={handleQualChange}
                    id="qual"
                    label="Qualification Wafer Type"
                    select
                >
                    {
                        props.lists.map(option => (
                            <MenuItem key={option.name} value={option.name}>
                                {option.name}
                            </MenuItem>
                        ))
                    }
                </TextFieldDarkMode>
                <TextFieldDarkMode
                    margin="normal"
                    required
                    error={qualQtyError}
                    fullWidth
                    id="quantity"
                    label="Enter the quantity you want to add"
                    value={qualQty}
                    onChange={handleQualQtyChange}
                    autoFocus
                    helperText={qualQtyErrorMessage}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                {
                    qualQtyError ?
                    <StyledButton onClick={handleClose} disabled>
                        SUBMIT
                    </StyledButton>
                    :
                    <StyledButton onClick={handleClickSubmit}>
                        SUBMIT
                    </StyledButton>
                }
            </DialogActions>
        </StyledDialog>
    );
}