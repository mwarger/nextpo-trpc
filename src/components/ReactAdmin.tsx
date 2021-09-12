import React, { useState } from 'react'
import {
  Admin,
  ListGuesser,
  Resource,
  List,
  Datagrid,
  ReferenceField,
  ShowGuesser,
  EditGuesser,
  Create,
  SimpleForm,
  TextInput,
} from 'react-admin'
import { QueryClient } from 'react-query'
import { getBaseUrl } from '../utils/getBaseUrl'
import { trpc } from '../utils/trpc'
import jsonServerProvider from './ra-data-json-server'
import TrpcDataProvider from './ra-data-trpc'
import superjson from 'superjson'
import { createTRPCClient } from '@trpc/client'
import { AppRouter } from '../server/routers/app'
import { useRouter } from 'next/router'
import { createBrowserHistory } from 'history'

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com')

// export const PostList = props => (
//   <List {...props}>
//       <Datagrid rowClick="edit">
//           <ReferenceField source="userId" reference="users"><TextField source="id" /></ReferenceField>
//           <TextField source="id" />
//           <TextField source="title" />
//           <TextField source="body" />
//       </Datagrid>
//   </List>
// );

const ReactAdmin = () => {
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
    }),
  )

  const trpcDataProvider = TrpcDataProvider(trpcClient)

  return (
    <Admin dataProvider={trpcDataProvider}>
      <Resource
        name="workout"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        create={WorkoutCreate}
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
