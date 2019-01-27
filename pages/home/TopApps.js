import Link from 'next/link'
import { encodeAppName } from '../../helpers'

export default function TopApps({name, apps}) {
  return (
    <div>
      <h3>{name}</h3>
      <ol>
      { apps.map(item =>
        <li key={item.id}>
        <Link href={"/searchResults?appId=" + item.id} as={"/apps/" + encodeAppName(item.name)}>
          <a>{item.name}</a>
        </Link>
        </li>
      )}
      </ol>  
      <Link href="/apps">
        <a>All apps</a>
      </Link>      
    </div>
  )
}