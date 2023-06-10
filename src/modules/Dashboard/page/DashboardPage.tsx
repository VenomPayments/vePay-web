import * as React from 'react'

import { useProvider, useStore } from '@/hooks/useStore'
import './DashboardPage.scss'

import { useTvmWallet } from '@/utils'

import {
    Button, Card, Flex, Form, Grid, Input, Modal, Text, Tile, Width,
} from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'
import classNames from 'classnames'
import { VePayStore } from '@/stores/VePayStore'
import { Dashboard } from '../components/Dashboard'
import { useRpcProvider } from '@broxus/js-core'


export default function DashboardPage(): JSX.Element {
    const intl = useIntl()
    const wallet = useTvmWallet()
    const provider = useRpcProvider("venom")

    // const pay = new VePay("0:d5202656dea2ce2518fb6dfb4a81d4ed6e8bb8898c078309b33faeca7fdb79a6", provider)
    return (
        <>
            {/* <p onClick={() => pay.pay('1', '0.1')}>
                pay
            </p> */}
            <Dashboard />
        </>
    )
}
