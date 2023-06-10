export const VePayRoot = {
  "ABI version": 2,
  version: "2.2",
  header: [
    "time"
  ],
  functions: [
    {
      name: "constructor",
      inputs: [
        {
          name: "_owner",
          type: "address"
        },
        {
          name: "_usdt",
          type: "address"
        }
      ],
      outputs: []
    },
    {
      name: "updateShopCode",
      inputs: [
        {
          name: "code",
          type: "cell"
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
      name: "forceUpgradeShops",
      inputs: [
        {
          name: "contracts",
          type: "address[]"
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
      name: "deployShop",
      inputs: [
        {
          name: "name",
          type: "string"
        },
        {
          name: "description",
          type: "string"
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
      name: "onShopDeploy",
      inputs: [
        {
          name: "shop_ID",
          type: "uint32"
        },
        {
          name: "shop_owner",
          type: "address"
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
      name: "getShopAddress",
      inputs: [
        {
          name: "answerId",
          type: "uint32"
        },
        {
          name: "ID",
          type: "uint32"
        }
      ],
      outputs: [
        {
          name: "value0",
          type: "address"
        }
      ]
    },
    {
      name: "upgrade",
      inputs: [
        {
          name: "new_code",
          type: "cell"
        }
      ],
      outputs: []
    }
  ],
  data: [
    {
      key: 1,
      name: "deploy_nonce",
      type: "uint32"
    },
    {
      key: 2,
      name: "shopCode",
      type: "cell"
    },
    {
      key: 3,
      name: "platformCode",
      type: "cell"
    }
  ],
  events: [
    {
      name: "ShopCodeUpdate",
      inputs: [
        {
          name: "call_id",
          type: "uint32"
        },
        {
          name: "oldVersion",
          type: "uint32"
        },
        {
          name: "newVersion",
          type: "uint32"
        }
      ],
      outputs: []
    },
    {
      name: "ShopDeployed",
      inputs: [
        {
          name: "call_id",
          type: "uint32"
        },
        {
          name: "shop_ID",
          type: "uint32"
        },
        {
          name: "shop_owner",
          type: "address"
        },
        {
          name: "shop",
          type: "address"
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
      name: "deploy_nonce",
      type: "uint32"
    },
    {
      name: "owner",
      type: "address"
    },
    {
      name: "usdt",
      type: "address"
    },
    {
      name: "shopCount",
      type: "uint32"
    },
    {
      name: "shopCode",
      type: "cell"
    },
    {
      name: "platformCode",
      type: "cell"
    },
    {
      name: "shopVersion",
      type: "uint32"
    }
  ]
} as const