import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'

import Shortcut from './Shortcut'

storiesOf('Shortcut', module)
  .addDecorator(withKnobs)
  .add('2 keys', () => <Shortcut keys={text('keys','ctrl+k')} />)
  .add('3 keys', () => <Shortcut keys={text('keys','ctrl+alt+k')} />)
  .add('then', () => <Shortcut keys={text('keys','ctrl+k v')} />)
  