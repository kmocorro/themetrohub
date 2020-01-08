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
        },
        '& .MuiFormHelperText-root' : {
            color: 'gray'
        }
    }
})(TextField);

export default function ResponsiveDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleClose = props.handleClose;
    const open = props.open;
    const limitToWithdraw = (props.toWithdraw.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const [ qualCategory, setQualCategory ] = useState(props.toWithdraw.qual);
    const [ qualQty, setQualQty ] = useState(100);
    const [ qualQtyError, setQualQtyError ] = useState(false)
    const [ qualQtyErrorMessage, setQualQtyErrorMessage ] = useState('')

    const experiment_name = useWithdrawForm('');
    const qual_purpose = useWithdrawForm('');
    
    function useWithdrawForm(init){
        const [ value, setValue ] = useState(init);

        function handleOnChange(e){
            setValue(e.target.value);
        }

        return {
            value,
            onChange: handleOnChange
        }
    }

    let excess = qualQty - props.toWithdraw.qty ;
    const handleQualChange = e => {
        setQualCategory(e.target.value)
    }
    const handleQualQtyChange = e => {
        setQualQty(e.target.value);
    }

    useEffect(() => {
        if (qualQty < 1) {
            setQualQtyError(true);
            setQualQtyErrorMessage('1 minimum per transaction')
        } else if(qualQty > props.toWithdraw.qty) {
            setQualQtyError(true);
            setQualQtyErrorMessage(`You have reached the limit by ${excess}. (${limitToWithdraw} max per transaction)`)
        } else if(isNaN(qualQty)) {
            setQualQtyError(true);
            setQualQtyErrorMessage('Incorrect quantity.')
        } else {
            setQualQtyError(false);
            setQualQtyErrorMessage('')
        }
    })

    async function handleClickSubmit(e) {
        const url = 'http://dev-metaspf401.sunpowercorp.com:8080/api/mh/withdrawinventory';

        handleClose()
        props.setToggle(!props.toggle)
        try {
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    qual: qualCategory,
                    qty: Number(qualQty),
                    mode: 'withdraw',
                    status: 'pending',
                    username: props.user.username,
                    experiment_name: experiment_name.value,
                    qual_purpose: qual_purpose.value
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
                <Typography color="primary" variant="inherit" style={{fontFamily: 'Roboto Condensed'}}>{props.toWithdraw.qual} Withdrawal Form</Typography>
            </DialogTitle>
            <DialogContent  >
                <DialogContentText style={{fontFamily: 'Roboto Condensed', color:"gray"}}  >
                    You are about to "withdraw" from the {props.toWithdraw.qual} Inventory.
                </DialogContentText>
                <TextFieldDarkMode
                    margin="normal"
                    required
                    fullWidth
                    id="experimentName"
                    label="Experiment Name"
                    value={experiment_name.value}
                    onChange={experiment_name.onChange}
                    autoFocus
                    helperText="Experiment name must be short and precise."
                    gutterBottom
                />
                <TextFieldDarkMode
                    margin="normal"
                    required
                    fullWidth
                    id="qualPurpose"
                    label="Purpose"
                    value={qual_purpose.value}
                    onChange={qual_purpose.onChange}
                    helperText="Purpose may be Engineering, RDD or Mfg"
                    gutterBottom
                />
                <TextFieldDarkMode
                    margin="normal"
                    required
                    error={qualQtyError}
                    fullWidth
                    id="quantity"
                    label="Enter the quantity you want to withdraw"
                    value={qualQty}
                    onChange={handleQualQtyChange}
                    helperText={qualQtyErrorMessage}
                    gutterBottom
                />
                <Typography color="primary" variant="caption" style={{fontFamily: 'Roboto Condensed', color: 'wheat', float: 'right'}}>
                    {limitToWithdraw} available for withdrawal.
                </Typography>
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
                    qual_purpose.value !== '' && experiment_name.value !== '' ?
                     <StyledButton onClick={handleClickSubmit}>
                        SUBMIT
                     </StyledButton>
                     : <></>
                    
                }
            </DialogActions>
        </StyledDialog>
    );
}