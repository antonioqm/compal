import React from "react";
import { TableContainer, Skeleton, Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const skeletons = [0,1,2,3,4,5,6,7,8,9]
export const SkeletonTable = () => {


  return (
    <>
      <Box
        sx={{
          marginTop: 4,
          borderRadius: 3,
          padding: 3,
          background: "#E7EDF2",
        }}
      ><Box>
          <Grid
            // padding={2}
            alignItems={"center"}
            sx={{
              pt: 4,
              px: 2,
              gap: 2,
              transform: "none",
              borderRadius: 3,
              bgcolor: "#E7EDF2",
              display: "flex",
            }}
          >
            <Skeleton
              animation="wave"
              sx={{
                transform: "none",
                my: 1,
                borderRadius: 3,
                bgcolor: "#d0d5d8",
              }}
              width={"5%"}
              height={20}
            />
            <Skeleton
              animation="wave"
              sx={{
                transform: "none",
                my: 1,
                borderRadius: 3,
                bgcolor: "#d0d5d8",
              }}
                height={20}
                width={"25%"}
            />
            <Skeleton
              animation="wave"
              sx={{
                transform: "none",
                my: 1,
                borderRadius: 3,
                bgcolor: "#d0d5d8",
              }}
              height={20}
              width={"40%"}
            />
            <Skeleton
              animation="wave"
              sx={{
                transform: "none",
                my: 1,
                borderRadius: 3,
                bgcolor: "#d0d5d8",
              }}
                height={20}
                width={"5%"}
            />
            <Skeleton
              animation="wave"
              sx={{
                transform: "none",
                my: 1,
                borderRadius: 3,
                bgcolor: "#d0d5d8",
              }}
              width={"20%"}
              height={20}
            />
          </Grid>
      </Box>
        <Box>
          {
          skeletons.map((item) => (
            <Grid key={item}
            padding={2}
            alignItems={"center"}
              sx={{
              gap: 2,
              height: 80,
              transform: "none",
              my: 1,
              borderRadius: 3,
              bgcolor: "#fff",
              display: "flex",
            }}
          >
            <Skeleton
              animation="wave"
              sx={{
                transform: "none",
                my: 1,
                borderRadius: 3,
                bgcolor: "#E7EDF2",
              }}
              width={"5%"}
              height={20}
            />
            <Skeleton
              animation="wave"
              sx={{
                transform: "none",
                my: 1,
                borderRadius: 3,
                bgcolor: "#E7EDF2",
              }}
                height={20}
                width={"25%"}
            />
            <Skeleton
              animation="wave"
              sx={{
                transform: "none",
                my: 1,
                borderRadius: 3,
                bgcolor: "#E7EDF2",
              }}
              height={20}
              width={"40%"}
            />
            <Skeleton
              animation="wave"
              sx={{
                transform: "none",
                my: 1,
                borderRadius: 3,
                bgcolor: "#E7EDF2",
              }}
                height={20}
                width={"5%"}
            />
            <Skeleton
              animation="wave"
              sx={{
                transform: "none",
                my: 1,
                borderRadius: 3,
                bgcolor: "#E7EDF2",
              }}
              width={"20%"}
              height={20}
            />
          </Grid>))
      }
      </Box>
       
      </Box>
    </>
  );
};
