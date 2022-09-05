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
          pt: 10,
          background: "#E7EDF2",
        }}
      >{
          skeletons.map((item) => (
            <Grid key={item}
            padding={2}
            alignItems={"center"}
            sx={{
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
              width={"20%"}
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
            />
          </Grid>))
      }
       
      </Box>
    </>
  );
};
