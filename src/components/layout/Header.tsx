import * as React from 'react'
import { Observer, observer } from 'mobx-react-lite'
import Media from 'react-media'
import { Link } from 'react-router-dom'
import { useIntl } from 'react-intl'
import {
    Button, Flex, Navbar, Text,
} from '@broxus/react-uikit'
import { ConnectButton, useTvmWalletContext } from '@broxus/react-modules'
import { Icon } from '@broxus/react-components'
import logo from '../../assets/icons/logo.png'


import { appRoutes } from '@/routes'

import './Header.scss'
import { useStore } from '@/hooks/useStore'
import { TvmConnector } from '@/utils/TvmConnector'

export function HeaderInner(): JSX.Element {
    const wallet = useTvmWalletContext()
    const intl = useIntl()

    return (
        <header className="header">
            <Navbar className="uk-width-expand">
                <Media query={{ minWidth: 768 }}>
                    {match => (match
                        ? (
                            <>
                                <Navbar.Left className="uk-width-expand header--logo">
                                    <Link to={appRoutes.home.makeUrl()} className="logo">
                                        <img style={{
                                            background: " #fff",
                                            padding: " 5px 10px",
                                            borderRadius: "9px",
                                        }} src={logo} />
                                    </Link>
                                </Navbar.Left>

                                <Observer>
                                    {() => (
                                        <Navbar.Right className="header-switchers" component={Navbar.Item}>
                                            <TvmConnector
                                                standalone
                                            />
                                        </Navbar.Right>
                                    )}
                                </Observer>
                            </>
                        )
                        : (
                            <Observer>
                                {() => (
                                    <>
                                        <Navbar.Left>
                                            <Navbar.Item>
                                                <Link to={appRoutes.home.makeUrl()} className="logo">
                                                    LOGO
                                                </Link>
                                            </Navbar.Item>
                                        </Navbar.Left>
                                        <Navbar.Right>
                                            <Navbar.Item>
                                                {wallet.isConnected
                                                    ? (
                                                        <TvmConnector
                                                            standalone
                                                            showDropMenu={false}
                                                        />
                                                    )
                                                    : (
                                                        <ConnectButton
                                                            key="connect"
                                                            popupType="modal"
                                                            type="default"
                                                            className="button-connect"
                                                            standalone
                                                        >
                                                            {intl.formatMessage({
                                                                id: 'CONNECT_WALLET',
                                                            })}
                                                        </ConnectButton>
                                                    )}

                                            </Navbar.Item>
                                        </Navbar.Right>
                                    </>
                                )}
                            </Observer>
                        ))}
                </Media>
            </Navbar>
        </header>
    )
}

export const Header = observer(HeaderInner)
