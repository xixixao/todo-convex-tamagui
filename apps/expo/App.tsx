import 'expo-dev-client'
import React from 'react'
import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

const convex = new ConvexReactClient('https://glad-bison-530.convex.cloud', {
  unsavedChangesWarning: false,
})

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <ConvexProvider client={convex}>
      <Provider>
        <NativeNavigation />
      </Provider>
    </ConvexProvider>
  )
}
