import 'raf/polyfill' // add this at the top
import { DripsyProvider } from 'dripsy'
import { theme } from '../theme/theme'
import { AppType } from 'next/dist/shared/lib/utils'
import { withTRPC } from '@trpc/next'
import { AppRouter } from '../server/routers/app'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import superjson from 'superjson'
import { getBaseUrl } from '../utils/getBaseUrl'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <DripsyProvider
        ssr
        theme={theme}
        // ssrPlaceholder={<div>Reticulating splines...</div>} // optional
      >
        <Component {...pageProps} />
      </DripsyProvider>
    </>
  )
}

export default withTRPC<AppRouter>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      /**
       * @link https://trpc.io/docs/links
       */
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      /**
       * @link https://trpc.io/docs/data-transformers
       */
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
  /**
   * Set headers or status code when doing SSR
   */
  // responseMeta({ clientErrors }) {
  //   if (clientErrors.length) {
  //     // propagate http first error from API calls
  //     return {
  //       status: clientErrors[0].data?.httpStatus ?? 500,
  //     }
  //   }

  //   // for app caching with SSR see https://trpc.io/docs/caching

  //   return {}
  // },
})(MyApp)
