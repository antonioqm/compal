import { Logout } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { cyan } from '@mui/material/colors';
import Link from "next/link";
import { useContext, useState } from "react";
import { useRecoilState } from "recoil";
import { AuthContext } from "../../../contexts/AuthContext";
import { currentUser } from "../../../state/atom";

export default () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [user_current, setModels] = useRecoilState(currentUser)
  const { signOut } = useContext(AuthContext)
  const firstLetterNamer = user_current?.currentUser.charAt(0)
  const name = user_current?.currentUser

  return (
    <>
    <Box sx={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
        <Typography color={'#878E9F'} fontWeight={700} fontSize={12} variant="overline">{name}</Typography>
        <Tooltip title="Configuração de conta">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, width: 24, height: 24,}}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
      <Avatar sx={{ background: cyan[400], fontWeight: 600, color: '#000', width: 16, height: 16, p:1.6, fontSize: 10 }}>{firstLetterNamer}</Avatar>

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
            minWidth: 240,
            overflow: 'visible',
            filter: 'drop-shadow(0px 1px 24px rgba(5, 85, 7, 0.234))',
            borderRadius: 3,
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
        <Link href="/meuperfil">
        <MenuItem >
          <Avatar >{ firstLetterNamer }</Avatar> <Typography fontWeight={700} > {name}</Typography>
        </MenuItem>
        </Link>
        <MenuItem >
          Usuários
        </MenuItem>
        <Divider />
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <Logout fontSize="small" /> Sair
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </>
  );
};
