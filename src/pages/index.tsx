import { Button, Text, View } from 'dripsy'
import { Link } from 'expo-next-react-navigation'
import { AnimatePresence, MotiView } from 'moti'
import React, { useState } from 'react'
import { Platform } from 'react-native'
import { ReactQueryDevtools } from 'react-query/devtools'
import { trpc } from '../utils/trpc'

export default function App() {
  const [visible, setVisible] = useState(false)
  const workouts = trpc.useQuery(['workout.all'])

  if (workouts.isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  const workoutList = workouts.data

  return (
    <>
      <View>
        <Button onPress={() => setVisible(!visible)} title="Toggle" />
        <Link style={{ color: 'green' }} routeName="profile">
          Click to go to profile
        </Link>
        {workoutList?.map((workout) => (
          <Text key={workout.id}>{workout.title}</Text>
        ))}
        <AnimatePresence>
          {visible && (
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
              }}
            >
              <Text>Stuff</Text>
            </MotiView>
          )}
        </AnimatePresence>
      </View>
      {Platform.OS === 'web' && <ReactQueryDevtools initialIsOpen={false} />}
    </>
  )
}
