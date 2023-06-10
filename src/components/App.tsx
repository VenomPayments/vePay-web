import React from 'react'
import {
    BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom'
import { TvmWalletProvider } from '@broxus/react-modules'
import { IntlProvider } from 'react-intl'

import { LocalizationContext } from '@/context/Localization'
import { useTvmWallet, noop } from '@/utils'
import { appRoutes } from '@/routes'

import './App.scss'

import DashboardPage from '@/modules/Dashboard'
import { useProvider } from '@/hooks/useStore'
import { ScrollManager } from './layout/ScrollManager'
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { VePayStore } from '@/stores/VePayStore'

export function App(): JSX.Element {
    const localization = React.useContext(LocalizationContext)
    const wallet = useTvmWallet()
    const UpexStoreProvider = useProvider(VePayStore, wallet)

    return (
        <IntlProvider
            key="intl"
            locale={localization.locale}
            defaultLocale="en"
            messages={localization.messages}
            onError={noop}
        >
            <TvmWalletProvider wallet={wallet}>
                <Router>
                    <ScrollManager>
                        <div className="wrapper" >
                            <div className='uk-light'>
                                <Header key="header" />
                            </div>
                            <main className="main">
                                <Switch>
                                    <Route exact path={appRoutes.home.makeUrl()}>
                                        <UpexStoreProvider>
                                            <DashboardPage />
                                        </UpexStoreProvider>
                                    </Route>
                                </Switch>
                            </main>
                            <Footer key="footer" />
                        </div>
                    </ScrollManager>
                </Router>
            </TvmWalletProvider>
        </IntlProvider>
    )
}
