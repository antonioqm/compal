import { Box, InputAdornment, Slide } from "@mui/material";
import { IconAt } from "@tabler/icons";

const DomainLabel = ({ showDomain, ...othersProps }: any) => {
  return (
    <>
      <Slide direction="left" in={showDomain}>
        <InputAdornment position="end">
          <Box
            sx={{
              bgcolor: "#f1f1f1d1",
              height: 32,
              lineHeight: "32px",
              display: "flex",
              width: "100%",
              borderRadius: 6,
              pl: 1,
              pr: 2,
              alignItems: "center",
              fontSize: 13,
            }}
          >
            <IconAt size={16} />
            compal.com
          </Box>
        </InputAdornment>
      </Slide>
    </>
  );
};

export default DomainLabel;
