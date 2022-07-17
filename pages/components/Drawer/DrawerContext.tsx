import React, { createContext } from 'react';



const DrawerContext = createContext({open: true, setOpen: (open:boolean) => {}});

export default DrawerContext;