import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext):Promise<GetServerSidePropsResult<P>> => {
     const cookies = parseCookies(ctx)
    if (cookies['nextAuth.token']) {
      return {
        redirect: {
          destination: '/nivel',
          permanent: false
        }
      }
    }
    return await fn(ctx);
  }
}