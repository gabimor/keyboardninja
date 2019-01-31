import ShortcutItem from './ShortcutItem'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 20px;
  box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
  background: white;
  font-size: 14px;
`

const Title = styled.header`
  color: white;
  background: linear-gradient(#273032, black);

  padding: 10px 20px;
  font-weight: 700;
`

function ShortcutCategory({ title, shortcuts }) {
  return (
    <Container>
      <Title>{title}</Title>
      <table style={{ width: '100%' }} cellSpacing={0}>
        <tbody>
          {shortcuts.map((shortcut, index) => (
            <ShortcutItem
              key={shortcut.id}
              keys={shortcut.win}
              action={shortcut.action}
              isDark={index % 2 === 0}
            />
          ))}
        </tbody>
      </table>
    </Container>
  )
}

export default ShortcutCategory
