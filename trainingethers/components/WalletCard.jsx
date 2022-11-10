import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';




const WalletCard = () => {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [provider, setProvider] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            setProvider(new ethers.providers.Web3Provider(window.ethereum));
        }
    }, []);


    const connectWallet = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            setAccount(account);
            console.log('Connected', account);
            const balance = await provider.getBalance(account)
            setBalance(ethers.utils.formatEther(balance));
            console.log('Balance', balance);
        } catch (error) {
            console.log(error);
        }
    }
    
return (
        <div>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Test MetaMask x Ethers.js
          </Typography>
          <Button id="connect-button" color="inherit" onClick={connectWallet}>Connect Wallet</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BadgeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Account : " secondary={account} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountBalanceIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Balance : " secondary={balance} />
      </ListItem>
      <Divider variant="inset" component="li" />
      
    </List>
            
            
        </div>
    )
}
export default WalletCard;
