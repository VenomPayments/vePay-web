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

    return (
        <>
            <Dashboard />
        </>
    )
}
