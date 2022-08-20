import { Logout } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { cyan } from '@mui/material/colors';
import { useState } from "react";

export default () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <Box sx={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
        <Typography color={'#878E9F'} fontSize={12} variant="overline">Antonio Queiroz</Typography>
        <Tooltip title="Configuração de conta">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, width: 24, height: 24,}}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
      <Avatar sx={{ background: cyan[400], fontWeight: 600, color: '#000', width: 16, height: 16, p:1.6, fontSize: 10 }}>AQ</Avatar>

          </IconButton>
          </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            // '&:before': {
            //   content: '""',
            //   display: 'block',
            //   position: 'absolute',
            //   top: 0,
            //   right: 14,
            //   width: 10,
            //   height: 10,
            //   bgcolor: 'background.paper',
            //   transform: 'translateY(-50%) rotate(45deg)',
            //   zIndex: 0,
            // },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        <MenuItem>
          <Avatar >M</Avatar> Minha Conta
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </>
  );
};
