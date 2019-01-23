import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import {} from '../components/theme'
import { Button, Welcome } from '@storybook/react/demo'
import { shortcuts } from '../data'

import Header from '../components/molecules/Header'
import Search from '../components/molecules/Search'
import ShortcutRow from '../components/molecules/ShortcutRow'
import ShortcutCategory from '../components/molecules/ShortcutsCategory'


storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))

storiesOf('Header', module).add('wide desktop', () => <Header/>)
storiesOf('Search', module).add('wide desktop', () => <Search/>)
storiesOf('ShortcutRow', module).add('wide desktop', () => 
  <>
    <ShortcutRow shortcut={shortcuts[0]} isDark={true}/> 
    <ShortcutRow shortcut={shortcuts[0]} isDark={false}/>
  </>
)
storiesOf('ShortcutCategory', module).add('wide desktop', () => <ShortcutCategory shortcuts={shortcuts }/> )
