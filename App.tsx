import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { DripsyProvider } from 'dripsy'
import AppIndex from './src/pages'
import { theme } from './src/theme/theme'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from './src/pages/profile'
import { QueryClient, QueryClientProvider } from 'react-query'
import { trpc } from './src/utils/trpc'
import { getBaseUrl } from './src/utils/getBaseUrl'
import superjson from 'superjson'
const Stack = createStackNavigator()

export default function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <DripsyProvider theme={theme}>
            <Stack.Navigator>
              <Stack.Screen
                name="home"
                component={AppIndex}
                options={{
                  title: 'Home',
                }}
              />
              <Stack.Screen name="profile" component={Profile} />
            </Stack.Navigator>
          </DripsyProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
