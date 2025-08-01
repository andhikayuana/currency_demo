import React from 'react'
import { Button, XGroup, XStack, YStack } from 'tamagui'

const TestScreen = () => {
  return (
    <YStack padding="$3" gap="$3">
      <Button>Plain</Button>
      <Button alignSelf="center" size="$6">
        Large
      </Button>
      <XStack gap="$2" justifyContent="center">
        <Button size="$3" theme="accent">
          Active
        </Button>
        <Button size="$3" variant="outlined">
          Outlined
        </Button>
      </XStack>
      <XStack gap="$2">
        <Button themeInverse size="$3">
          Inverse
        </Button>
        <Button size="$3">
          iconAfter
        </Button>
      </XStack>
      <XGroup>
        <XGroup.Item>
          <Button width="50%" size="$2" disabled opacity={0.5}>
            disabled
          </Button>
        </XGroup.Item>

        <XGroup.Item>
          <Button width="50%" size="$2" chromeless>
            chromeless
          </Button>
        </XGroup.Item>
      </XGroup>
    </YStack>
  )
}

export default TestScreen