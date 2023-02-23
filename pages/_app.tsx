import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CommonLayout } from '../layouts/CommonLayout/CommonLayout'

export default function App(props: AppProps) {
  return <CommonLayout {...props} />
}

