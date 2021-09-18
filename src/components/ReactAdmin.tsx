import React, { useState } from 'react'
import {
  Admin,
  ListGuesser,
  Resource,
  ShowGuesser,
  EditGuesser,
  Create,
  SimpleForm,
  TextInput,
} from 'react-admin'
import { getBaseUrl } from '../utils/getBaseUrl'
import { createTRPCDataProvider } from 'trpc-react-admin/client'
import superjson from 'superjson'
import { createTRPCClient } from '@trpc/client'
import { AppRouter } from '../server/routers/app'

const ReactAdmin = () => {
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
    }),
  )

  // supabase adapter lets you pass in resources, let's try it
  // this is only used in the `getOne` method for now
  // change this to see react-admin change what is shown on the edit/show page types
  const resources: Record<string, string[]> = {
    workout: ['id', 'title'],
    // workout: ['id', 'title', 'description'],
  }

  const trpcDataProvider = createTRPCDataProvider(trpcClient, resources)

  return (
    <Admin dataProvider={trpcDataProvider}>
      <Resource
        name="workout"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        create={WorkoutCreate}
      />
      <Resource
        name="user"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        // create={WorkoutCreate}
      />
    </Admin>
  )
}

export default ReactAdmin

export const WorkoutCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
)
