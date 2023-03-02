import {
  Anchor,
  Button,
  Checkbox,
  H1,
  Input,
  Paragraph,
  Separator,
  Sheet,
  Spinner,
  TextArea,
  XStack,
  YStack,
} from '@my/ui'
import { Airplay, Check, ChevronDown, ChevronUp, Delete, Trash2 } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { FlatList, Platform } from 'react-native'
import { useLink } from 'solito/link'
import { useMutation, useQuery } from '../../../../convex/_generated/react'

type Item = { text: string; isCompleted: boolean }
type Filter = 'all' | 'notCompleted' | 'completed'

export function HomeScreen() {
  const linkProps = useLink({
    href: '/user/nate',
  })
  const addTodo = useMutation('addTodo')
  const [filter, setFilter] = useState<Filter>('all')
  const [todoList, numRemaining] = useTodoList(filter)

  return (
    <XStack f={1} jc="center" p="$4" space>
      <YStack f={1} space="$4" maw={600}>
        <YStack f={1} space="$4">
          <H1>ToDo List</H1>
          {todoList}
        </YStack>
        <Composer addTodo={addTodo} />

        <Paragraph ta="center">
          Made by{' '}
          <Anchor color="$color12" href="https://twitter.com/xixixao" target="_blank">
            @xixixao
          </Anchor>{' '}
          at{' '}
          <Anchor color="$color12" href="https://convex.dev" target="_blank" rel="noreferrer">
            Convex
          </Anchor>
        </Paragraph>
      </YStack>
    </XStack>
  )
}

function useTodoList(filter: Filter) {
  const todos = useQuery('listTodos')
  const updateTodo = useMutation('updateTodo')
  const deleteTodo = useMutation('deleteTodo')
  // let todos = [
  //   { id: '1', text: 'Do something', isCompleted: false },
  //   { id: '2', text: 'Buy stuff', isCompleted: false },
  // ]
  if (todos == null) {
    return [<Spinner size="large" />, 0]
  }
  const allItems = todos
  const filteredItems = allItems.filter(
    ({ isCompleted }) =>
      filter === 'all' ||
      (filter === 'notCompleted' && !isCompleted) ||
      (filter === 'completed' && isCompleted)
  )
  const numRemaining = allItems.filter(({ isCompleted }) => !isCompleted).length

  return [
    <>
      {allItems.length === 0 ? (
        'No items'
      ) : filteredItems.length === 0 ? (
        filter === 'completed' ? (
          'No completed items'
        ) : (
          'No items to do'
        )
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={filteredItems}
          ItemSeparatorComponent={() => <XStack h="$1" />}
          renderItem={({ item: { _id: id, isCompleted, text } }) => (
            <XStack f={1} space="$2">
              <Button
                aria-label="Delete item"
                als="center"
                icon={Trash2}
                size="$4"
                onPress={() => {
                  deleteTodo(id)
                }}
              ></Button>
              <XStack
                f={1}
                space="$2"
                elevation={2}
                p="$2"
                borderRadius="$4"
                backgroundColor="whiteA"
              >
                <TextArea
                  py={Platform.OS === 'web' ? 6 : 1}
                  px="$3"
                  style={{ flex: 1 }}
                  height={40}
                  value={text}
                  onChangeText={(newText) => {
                    updateTodo(id, { text: newText })
                  }}
                />
                <Checkbox
                  checked={isCompleted}
                  onCheckedChange={() => {
                    updateTodo(id, { isCompleted: !isCompleted })
                  }}
                  size="$8"
                >
                  <Checkbox.Indicator>
                    <Check />
                  </Checkbox.Indicator>
                </Checkbox>
              </XStack>
            </XStack>
          )}
          keyExtractor={(item) => item._id.toString()}
        />
      )}
    </>,
    numRemaining,
  ]
}

function Composer(props: { addTodo: (item: Item) => void }) {
  const [text, setText] = useState('')
  return (
    <XStack bg="whiteA" py="$3" px="$3" space="$3" elevation={2}>
      <Input f={1} value={text} onChangeText={setText} />
      <Button
        onPress={(event) => {
          props.addTodo({ text, isCompleted: false })
          setText('')
        }}
      >
        Add todo
      </Button>
    </XStack>
  )
}
