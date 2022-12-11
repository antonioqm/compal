import {
  Card, CardContent,
  Chip,
  Stack,
  Typography
} from "@mui/material";
import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import { setupApiClient } from "../../src/api/api";
import Layout from "../../src/components/Layout";
import { AuthContext } from "../../src/contexts/AuthContext";
import { modelState, useModelMutations } from "../../src/state/atom";
import { withSSRAuth } from "../../src/utils/withSSRAuth";

interface User {
  name: string;
  email: string;
  id: string | number;
  roles: [{ id: string; name: string }];
}
const header = ["Nome", "Email"];

export default () => {
  const { user, isAuthenticaton } = useContext(AuthContext);
  const { listAllModel } = useModelMutations();
  const [listItem, setListItem] = useRecoilState<User[]>(modelState);

  useEffect(() => {
    listAllModel("account/list").then((res: any) => {
      console.log(" User", res);
      setListItem(res);
    });
  }, []);

  function handleDelete(user: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Layout title="Users">
      {/* <Filter onChangeFilter={updateUrlFilters} items={userFilter}  endpoint='itens-expostos' /> */}
      <Stack gap={3} alignItems={'stretch'} direction={'row'} flexWrap={'wrap'} >
        {listItem.map((user, index) => {
          return (
            <Card  key={user.id} sx={{ flexGrow:1, flexDirection: 'column', display: 'flex', flexBasis: '40%', justifyContent: 'space-between' }}>
              <CardContent>
                {/* <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Word of the Day
                </Typography> */}
                <Typography variant="h5" component="div">
                  {user.name}
                </Typography>
                <Typography  sx={{ mb: 1.5, color: '#08bbf1' }} color="text.secondary">
                  {user.email}
                </Typography>
                <Stack direction={'row'} alignItems={'stretch'} spacing={1}>
                  { user?.roles && user?.roles?.map(role => {
                    return (<Chip size="small"  label={role.name}></Chip>)
                  })}
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupApiClient(ctx);

    // await apiClient.get("account/currentUser");
    return {
      props: {},
    };
  }
);