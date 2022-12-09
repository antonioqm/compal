import {
  styled, Toolbar, Typography
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useRouter } from 'next/router';
import { useContext, useRef } from 'react';
import { currentPage } from '../../ROUTES';
import GlobalContext from '../Drawer/GlobalContext';
import ElevationScroll from '../ElevationScroll';
import Swipeable from '../Swipeable/Swipeable';
import Avatar from './Avatar';

const drawerWidth = 256;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  height: 80,
  boxShadow: 'none',
  zIndex: theme.zIndex.drawer + 1,
  background: '#f5f7fb7c',
  backdropFilter: 'blur(5px)',
  width: `calc(100% - ${64}px)`,
  transition: theme.transitions.create(['width', 'margin', 'background'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin', 'background'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface PropsAppbar{
  title: string;
}

export default function Appbar({title}:PropsAppbar) {
  const myRef = useRef<any>(null);
  const { open } = useContext(GlobalContext);
  const router = useRouter();
  const Route = currentPage(router.pathname)!;
  // const [toogleDrawer, setToogleDrawer] = useState<boolean>(false)
  const closeDrawer = () => {
    // myRef.current?.closeSwipeable()!
  }

  return (
    <ElevationScroll>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ height: '100%' }}>
          {Route?.addButton ? (
            <Swipeable
            ref={myRef}
              type={'Create'}
              tooltipLabel={`Adicionar ${Route?.label}`}
              title={Route?.label}
            >
              {Route && <Route.FormComponent  closeForm={closeDrawer}  action={'Create'} />}
            </Swipeable>
          ) : (
            <Typography
            fontWeight={800}
            color={"#64A70B"}
            textTransform={"uppercase"}
            variant="h6"
            component="h6"
          >
            {`${title}`}
          </Typography>
          )}

          <Typography
            sx={{ marginLeft: 2, flexGrow: '1' }}
            variant="h6"
            fontSize={24}
            fontWeight="800"
            color={'primary'}
            noWrap
            component="h1"
          >
            {Route?.label}
          </Typography>
          <Avatar />
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
}
