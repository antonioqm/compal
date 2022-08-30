import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { FilterList } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { IconCheck, IconX } from "@tabler/icons";

const INITIAL_ITEMS = [
  { actived: false, label: "partNumber" },
  { actived: false, label: "level" },
  { actived: false, label: "date" },
];

export interface SimpleDialogProps {
  title: string;
  open: boolean;
  selectedValue: FiltersItem[];
  onSelected: (value: FiltersItem) => void;
  onClose: () => void;
}

interface FiltersItem {
  actived: boolean;
  label: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

function SimpleDialog({
  onClose,
  onSelected,
  selectedValue,
  open,
  title,
}: SimpleDialogProps) {
  const handleClose = (value: string) => {
    onClose();
  };

  const handleListItemClick = (index: number) => {
    const cloneFilters = [...selectedValue];
    onSelected(cloneFilters[index]);
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      sx={{
        borderRadius: 4,
        "& .MuiPaper-root": {
          background: "#E7EDF2",
          borderRadius: 3,
        },
      }}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="overline">{title}</Typography>
        <IconButton onClick={onClose}>
          <IconX />
        </IconButton>
      </DialogTitle>
      <Divider />
      <Box sx={{ pt: 0, width: 400, height: 400 }}>
        <List sx={{ pt: 0 }}>
          {selectedValue!.map(({ label, actived }, index) => (
            <ListItemButton
              selected={actived}
              onClick={() => handleListItemClick(index)}
              key={index}
            >
              <ListItemIcon>{actived && <IconCheck />}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Dialog>
  );
}

interface PropsDialog {
  title: string;
}
export default function index({ title }: PropsDialog) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersItem[]>(INITIAL_ITEMS);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSelected = (value: FiltersItem) => {
    const status = !value.actived;
    let cloneFilters = [...filters];

    cloneFilters = cloneFilters.map((item) => {
      if (item.label === value.label) {
        item.actived = !item.actived;
      }
      return item;
    });

    setFilters([...cloneFilters]);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="text"
        color="inherit"
        sx={{ color: "#878E9F", px: "16px ", height: 48, borderRadius: 0 }}
      >
        <Typography variant="overline">Filtrar</Typography>

        <FilterList sx={{ marginLeft: 1, p: 0 }} />
        <Stack direction="row" spacing={1}>
          {filters.map(({ label, actived }, index) => {
            if (actived) return <Chip key={index} size="small" label={label} />;
          })}
        </Stack>
      </Button>
      <SimpleDialog
        title={title}
        selectedValue={filters}
        open={open}
        onClose={handleClose}
        onSelected={handleSelected}
      />
    </div>
  );
}
