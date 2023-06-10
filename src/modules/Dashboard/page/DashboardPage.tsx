import * as React from 'react'
import './DashboardPage.scss'
import { useTvmWallet } from '@/utils'
import { useIntl } from 'react-intl'
import { Dashboard } from '../components/Dashboard'
import { useRpcProvider } from '@broxus/js-core'


export default function DashboardPage(): JSX.Element {
    const intl = useIntl()
    const wallet = useTvmWallet()
    const provider = useRpcProvider("venom")
    return (
        <>
            <Dashboard />
        </>
    )
}
