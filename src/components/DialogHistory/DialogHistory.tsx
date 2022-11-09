import {
  Dialog, DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TableBody,
  TableHead,
  TableRow as TableRowMui
} from '@mui/material';
import { IconHistory, IconX } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import { formatDate } from '../../utils/format';
import Table from '../Table/Table';
import { TableCell } from '../Table/TableCell';
import { TableRow } from '../Table/TableRow';
interface DialogHistoryProp {
  onAction: () => void;
  header: { name: string; field: string; type: string }[];
  data: { [key: string]: string }[];
}
export default function DialogHistory({
  header,
  data,
  onAction,
}: DialogHistoryProp): JSX.Element {
  const [openDialogTrash, setOpenDialogTrash] = React.useState(false);

  const [open, setOpen] = useState(false);

  const dataOrder = data.sort((a, b) => {
    const newB = new Date(b.occurrencyDate).getTime()
    const newA = new Date(a.occurrencyDate).getTime()
    return newA - newB
  })

  useEffect(() => {
    onAction();
  }, [open]);

  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpenDialogTrash(false);
  };

  return (
    <>
      <IconButton onClick={onOpen} sx={{ width: 42, color: '#3779FA' }}>
        <IconHistory />
      </IconButton>

      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          p: 10,
          '& .MuiPaper-root': { borderRadius: 4, p: 2, width: '100%' },
        }}
      >
        <DialogTitle  sx={{
                  display: "flex",
                  alignContent: "space-between",
                  justifyContent: "space-between",
                }} id="alert-dialog-title">
          <Stack flexDirection={"row"}>
                  {" "}
                  <IconButton disableRipple>
                    <IconHistory />
                  </IconButton>{" "}
                  {`Histórico `}
                </Stack>
                <IconButton
                  onClick={() => {
                   onClose()
                  }}
                >
                  <IconX />{" "}
                </IconButton>
        </DialogTitle>
        <DialogContent>
          <Table>
            {header?.length && data?.length ? (
              <>
                <TableHead>
                  <TableRowMui
                    sx={{ boxShadow: 'none', background: 'transparent' }}
                  >
                    {header?.length &&
                      header.map(({ name }, index) => (
                        <TableCell key={index}>
                          <>{name}</>
                        </TableCell>
                      ))}
                  </TableRowMui>
                </TableHead>
                <TableBody>
                  {dataOrder.map((row: { [key: string]: any }, index: number) => (
                    <TableRow key={index}>
                      {header.map(({ field, type }: any, index: number) => (
                        <TableCell key={index} component="th" scope="row">
                          {type === 'datetime' || type === 'date'
                            ? formatDate(row[field])
                            : row[field]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={header.length}>
                    Nenhum registro encontrado
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </DialogContent>
        {/* <DialogActions sx={{ height: 120 }}>
          <Button sx={{ height: 56 }} color={'inherit'} onClick={onClose}>
            Fechar
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
}
