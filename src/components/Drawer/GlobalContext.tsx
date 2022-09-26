import React, { createContext } from 'react';

const GlobalContext = createContext({open: true, setOpen: (open:boolean) => {}});

export default GlobalContext;