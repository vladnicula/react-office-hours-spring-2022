import { GetServerSidePropsContext, PreviewData } from "next"
import { ParsedUrlQuery } from "querystring"

export function handle401Erorr(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) {
    context.res.setHeader(
      "Set-Cookie", [
      `WebsiteToken=deleted; Max-Age=0`,
      `AnotherCookieName=deleted; Max-Age=0`
    ])
  
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    }
  }
  
  