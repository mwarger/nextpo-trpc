// export default dynamic(() => Promise.resolve(App), {
// 	ssr: false,
// });

export function getBaseUrl() {
  if (process.browser) {
    return ''
  }
  // // reference for vercel.com
  // if (process.env.VERCEL_URL) {
  //   return `https://${process.env.VERCEL_URL}`;
  // }
  // // reference for render.com
  // if (process.env.RENDER_INTERNAL_HOSTNAME) {
  //   return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // }
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}
