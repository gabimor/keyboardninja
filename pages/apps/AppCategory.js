import Link from 'next/link'
import { encodeAppName } from '../../helpers'

export default function AppCategory({name, apps}) {
  return (
    <div>
      <h3>{name}</h3>
      { apps.map(item =>
      <div key={item.id}>            
        <Link href={"/searchResults?appId=" + item.id} as={"/apps/" + encodeAppName(item.name)}>
          <a>{item.name}</a>
        </Link>
      </div>
    )}  

    </div>
  )
}