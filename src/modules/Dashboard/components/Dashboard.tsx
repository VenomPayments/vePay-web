import * as React from 'react'

import { useProvider, useStore } from '@/hooks/useStore'
import '../page/DashboardPage.scss'

import { useTvmWallet } from '@/utils'
import { CopyBlock, dracula } from "react-code-blocks";

import {
    Button, Card, Flex, Form, Grid, Icon, Input, Modal, Text, Tile, Width,
} from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'
import classNames from 'classnames'
import { VePayStore } from '@/stores/VePayStore'
import { VePayGetDataShop } from '@/abi/types'
import BigNumber from 'bignumber.js'
import { USDT_DECIMALS } from '@/config'


export default function DashboardInner(): JSX.Element {
    const intl = useIntl()
    const wallet = useTvmWallet()
    const vePay = useStore(VePayStore)

    // --- Add company
    const [modalAddCompany, setModalAddCompany] = React.useState(false)
    const onModalAddCompany = () => {
        setModalAddCompany(!modalAddCompany)
    }
    const [value, setValue] = React.useState('')
    const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        setValue(event.target.value)
    }

    const [valueDescription, setValueDescription] = React.useState('')
    const onChangeDescription: React.ChangeEventHandler<HTMLInputElement> = event => {
        setValueDescription(event.target.value)
    }

    // --- Withdraw
    const [modalWithdraw, setModalWithdraw] = React.useState(false)
    const [modalShopID, setModalShopID] = React.useState<number>(0)
    const onModalWithdraw = (i: number) => {
        setModalShopID(i)
        setModalWithdraw(!modalWithdraw)
    }
    const [valueWithdraw, setValueWithdraw] = React.useState('')
    const onChangeWithdraw: React.ChangeEventHandler<HTMLInputElement> = event => {
        setValueWithdraw(event.target.value)
    }

    function generateRandomUint32() {
        return Math.floor(Math.random() * Math.pow(2, 32)).toString();
    }

    const deployShop = (name: string, description: string) => {
        vePay.deployShop(name, description, {
            call_id: generateRandomUint32(),
            send_gas_to: wallet.account?.address!
        })
    }

    React.useEffect(() => {
        if (wallet.account?.address)
            vePay.getShops()
    }, [wallet.account?.address])

    return (
        <Observer>
            {() => (
                <>
                    {!wallet.isConnected ?
                        <>
                            <Text>Not Connect</Text>
                        </>
                        :
                        <>
                            <div className='dashboard'>
                                <Button type='default'
                                    onClick={() => vePay.getTokens(wallet.account?.address!)}
                                    style={{
                                        position: "fixed",
                                        left: "30px",
                                        bottom: "30px",
                                    }}>
                                    Get tokens
                                </Button>
                                <Grid gap='medium' match childWidth={1}>
                                    <Flex justifyContent='between' flexDirection='row'>
                                        <Card className='uk-width-auto'>
                                            <Text component='h2'>All companies</Text>
                                            <Text>Easy payments with venom network</Text>
                                        </Card>
                                        <Card className='uk-width-auto uk-margin-auto-vertical' >
                                            <Button type='default' onClick={() => onModalAddCompany()}>
                                                Add new company
                                            </Button>
                                        </Card>
                                    </Flex>
                                    <Grid gap='small' childWidth={4} >
                                        {vePay.shops ? vePay.shops.map((item, i) => (
                                            <Width size='1-4'>
                                                <Tile type='primary' className="uk-padding-small uk-padding-remove" onClick={() => onModalWithdraw(i)}>
                                                    <div className='dashboard--carts__item--header'>
                                                        <Text component='h5'>{item._name}</Text>
                                                    </div>
                                                    <Flex justifyContent='center' className='uk-padding-small'>
                                                        <Text>{new BigNumber(item._usdtBalance).shiftedBy(-USDT_DECIMALS).toFixed()} USDT</Text>
                                                    </Flex>
                                                </Tile>
                                            </Width>
                                        ))
                                            :
                                            <Text>Loading...</Text>
                                        }

                                    </Grid>
                                </Grid>
                            </div>
                            <Modal
                                className="uk-swap-confirmation-modal"
                                visible={modalAddCompany}
                                onClose={onModalAddCompany}
                            >
                                <Flex flexDirection='column'>
                                    <Text component={'h4'}> Add company</Text>
                                    <Form>
                                        <Form.Controls>
                                            <Input
                                                value={value}
                                                placeholder="Enter name company"
                                                onChange={onChange}
                                                className='uk-margin-small-top'
                                            />
                                            <Input
                                                value={valueDescription}
                                                placeholder="Enter description company"
                                                onChange={onChangeDescription}
                                                className='uk-margin-small-top'
                                            />
                                        </Form.Controls>
                                    </Form>

                                    <Button
                                        type='default'
                                        className='uk-margin-small-top'
                                        onClick={() => {
                                            deployShop(value, valueDescription)
                                            onModalAddCompany()
                                        }}
                                        disabled={value && valueDescription ? false : true}
                                    >
                                        Add company
                                    </Button>


                                </Flex>
                            </Modal>
                            <div className={classNames('info-company', modalWithdraw && 'info-company--open')}>
                                <div className='info-company--container'>
                                    <Icon icon='close' style={{
                                        right: "25px",
                                        position: "absolute",
                                        zIndex: "99999",
                                        top: "25px",
                                        cursor: "pointer",
                                    }}
                                        onClick={() => setModalWithdraw(!modalWithdraw)} />
                                    <Card className='uk-width-auto uk-margin-medium-bottom'>
                                        <Text component='h3'>{vePay?.shops?.length && vePay.shops[modalShopID]._name}</Text>
                                        <Text component='h5'>{vePay?.shops?.length && vePay.shops[modalShopID]._description}</Text>
                                    </Card>
                                    <Observer>
                                        {() => (
                                            <Card className='uk-width-auto uk-margin-medium-bottom'>
                                                <Text component='h4' className='uk-margin-small-bottom'>Transactions</Text>
                                                <Tile type='primary' className='uk-padding-remove'>
                                                    <table className="uk-table uk-table-divider uk-width-1-1 table uk-padding-remove">
                                                        <thead className="uk-height-1-1">
                                                            <tr>
                                                                <th className="uk-text-left uk-width-medium">
                                                                    Order ID
                                                                </th>
                                                                <th className="uk-text-left uk-width-medium">
                                                                    Amount
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        {//@ts-ignore
                                                            vePay?.shops?.length && vePay.shops[modalShopID].transactions.length ?
                                                                <tbody>
                                                                    {//@ts-ignore
                                                                        vePay?.shops?.length && vePay.shops![modalShopID]?.transactions?.map((item: { orderId: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; amount: BigNumber.Value }) => (
                                                                            <tr>
                                                                                <td className="uk-text-left uk-width-medium">
                                                                                    {item.orderId}
                                                                                </td>
                                                                                <td className="uk-text-left uk-width-medium">
                                                                                    {new BigNumber(item.amount).shiftedBy(-USDT_DECIMALS).toFixed()}
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                </tbody>
                                                                :
                                                                <>
                                                                    <Text className='uk-margin-small uk-padding-small'>Don`t have transactions</Text>
                                                                </>}
                                                    </table>
                                                </Tile>
                                            </Card>
                                        )}
                                    </Observer>
                                    <Card className='uk-width-auto uk-margin-small-bottom'>
                                        <Text component='h4'>Withdraw</Text>
                                    </Card>
                                    <Tile type='primary' className='uk-padding-small'>
                                        {/* {//@ts-ignore
                                            modalShopID && vePay.shops[modalShopID]._usdtBalance === 0 ?
                                                <>
                                                    <Text className='uk-margin-small uk-padding-small'>Don`t have money</Text>
                                                </>
                                                : */}
                                        <Form>
                                            <Form.Controls className='uk-margin-small-bottom'>
                                                <Input
                                                    value={valueWithdraw}
                                                    placeholder="Enter for withdrawal"
                                                    className="uk-form-width-medium"
                                                    onChange={onChangeWithdraw}
                                                />
                                            </Form.Controls>
                                            <Button type='default' onClick={() => {
                                                vePay.withdraw(
                                                    valueWithdraw,
                                                    {
                                                        call_id: generateRandomUint32(),
                                                        send_gas_to: wallet.account?.address!,
                                                    },
                                                    //@ts-ignore
                                                    vePay?.shops && vePay.shops![modalShopID].address
                                                )
                                            }}>
                                                Withdraw
                                            </Button>
                                        </Form>
                                        {/* } */}

                                    </Tile>
                                    <Card className='uk-width-auto uk-margin-small-bottom'>
                                        <Text component='h4'>Your code</Text>
                                    </Card>
                                    <Tile type='primary' className='uk-padding-small'>
                                        <CopyBlock
                                            text={`const payService = new VePay({
                                                    ${  //@ts-ignore
                                                vePay?.shops?.length && vePay.shops![modalShopID].address.toString()}
                                                })
                                                const onPay = () => {
                                                    payService.pay(
                                                        orderId: // Your orderId,
                                                         amount: // Your amount,
                                                    }
                                                  }
                                                <button onClick={onPay} > Pay bill </button>`}
                                            language="jsx"
                                            codeBlock={true}
                                            theme={dracula}
                                            showLineNumbers={false}
                                            wrapLines={true}
                                        />

                                        <br />
                                        <a href="https://www.npmjs.com/package/vepay" target="_blank" >Our npm lib</a>
                                    </Tile>
                                </div>
                            </div>

                        </>
                    }
                </>
            )}
        </Observer>
    )
}

export const Dashboard = observer(DashboardInner)
