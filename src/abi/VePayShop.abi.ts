export const VePayShop = {
  "ABI version": 2,
  version: "2.2",
  header: [
    "time"
  ],
  functions: [
    {
      name: "constructor",
      inputs: [],
      outputs: []
    },
    {
      name: "getDetails",
      inputs: [],
      outputs: [
        {
          name: "_ID",
          type: "uint32"
        },
        {
          name: "_root",
          type: "address"
        },
        {
          name: "_usdt",
          type: "address"
        },
        {
          name: "_usdtWallet",
          type: "address"
        },
        {
          name: "_usdtBalance",
          type: "uint128"
        },
        {
          name: "_owner",
          type: "address"
        },
        {
          name: "_name",
          type: "string"
        },
        {
          name: "_description",
          type: "string"
        },
        {
          name: "_currentVersion",
          type: "uint32"
        }
      ]
    },
    {
      name: "receiveTokenWalletAddress",
      inputs: [
        {
          name: "wallet",
          type: "address"
        }
      ],
      outputs: []
    },
    {
      name: "encodeTokenTransfer",
      inputs: [
        {
          name: "orderId",
          type: "uint32"
        },
        {
          name: "call_id",
          type: "uint32"
        }
      ],
      outputs: [
        {
          name: "value0",
          type: "cell"
        }
      ]
    },
    {
      name: "onAcceptTokensTransfer",
      inputs: [
        {
          name: "value0",
          type: "address"
        },
        {
          name: "amount",
          type: "uint128"
        },
        {
          name: "sender",
          type: "address"
        },
        {
          name: "value3",
          type: "address"
        },
        {
          name: "remainingGasTo",
          type: "address"
        },
        {
          name: "payload",
          type: "cell"
        }
      ],
      outputs: []
    },
    {
      name: "withdraw",
      inputs: [
        {
          name: "amount",
          type: "uint128"
        },
        {
          components: [
            {
              name: "call_id",
              type: "uint32"
            },
            {
              name: "send_gas_to",
              type: "address"
            }
          ],
          name: "meta",
          type: "tuple"
        }
      ],
      outputs: []
    },
    {
      name: "upgrade",
      inputs: [
        {
          name: "new_code",
          type: "cell"
        },
        {
          name: "new_version",
          type: "uint32"
        },
        {
          components: [
            {
              name: "call_id",
              type: "uint32"
            },
            {
              name: "send_gas_to",
              type: "address"
            }
          ],
          name: "meta",
          type: "tuple"
        }
      ],
      outputs: []
    }
  ],
  data: [],
  events: [
    {
      name: "Payment",
      inputs: [
        {
          name: "call_id",
          type: "uint32"
        },
        {
          name: "sender",
          type: "address"
        },
        {
          name: "amount",
          type: "uint128"
        },
        {
          name: "orderId",
          type: "uint32"
        }
      ],
      outputs: []
    },
    {
      name: "Withdraw",
      inputs: [
        {
          name: "call_id",
          type: "uint32"
        },
        {
          name: "amount",
          type: "uint128"
        }
      ],
      outputs: []
    }
  ],
  fields: [
    {
      name: "_pubkey",
      type: "uint256"
    },
    {
      name: "_timestamp",
      type: "uint64"
    },
    {
      name: "_constructorFlag",
      type: "bool"
    },
    {
      name: "ID",
      type: "uint32"
    },
    {
      name: "root",
      type: "address"
    },
    {
      name: "usdt",
      type: "address"
    },
    {
      name: "usdtWallet",
      type: "address"
    },
    {
      name: "usdtBalance",
      type: "uint128"
    },
    {
      name: "owner",
      type: "address"
    },
    {
      name: "name",
      type: "string"
    },
    {
      name: "description",
      type: "string"
    },
    {
      name: "platform_code",
      type: "cell"
    },
    {
      name: "currentVersion",
      type: "uint32"
    }
  ]
} as const