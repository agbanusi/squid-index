export const ABI_JSON = [
    {
        "type": "error",
        "name": "ERC1155InsufficientBalance",
        "inputs": [
            {
                "type": "address",
                "name": "sender"
            },
            {
                "type": "uint256",
                "name": "balance"
            },
            {
                "type": "uint256",
                "name": "needed"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC1155InvalidApprover",
        "inputs": [
            {
                "type": "address",
                "name": "approver"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC1155InvalidArrayLength",
        "inputs": [
            {
                "type": "uint256",
                "name": "idsLength"
            },
            {
                "type": "uint256",
                "name": "valuesLength"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC1155InvalidOperator",
        "inputs": [
            {
                "type": "address",
                "name": "operator"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC1155InvalidReceiver",
        "inputs": [
            {
                "type": "address",
                "name": "receiver"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC1155InvalidSender",
        "inputs": [
            {
                "type": "address",
                "name": "sender"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC1155MissingApprovalForAll",
        "inputs": [
            {
                "type": "address",
                "name": "operator"
            },
            {
                "type": "address",
                "name": "owner"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "ApprovalForAll",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "indexed": true
            },
            {
                "type": "address",
                "name": "operator",
                "indexed": true
            },
            {
                "type": "bool",
                "name": "approved",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "TransferBatch",
        "inputs": [
            {
                "type": "address",
                "name": "operator",
                "indexed": true
            },
            {
                "type": "address",
                "name": "from",
                "indexed": true
            },
            {
                "type": "address",
                "name": "to",
                "indexed": true
            },
            {
                "type": "uint256[]",
                "name": "ids"
            },
            {
                "type": "uint256[]",
                "name": "values"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "TransferSingle",
        "inputs": [
            {
                "type": "address",
                "name": "operator",
                "indexed": true
            },
            {
                "type": "address",
                "name": "from",
                "indexed": true
            },
            {
                "type": "address",
                "name": "to",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "id",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "value",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "URI",
        "inputs": [
            {
                "type": "string",
                "name": "value",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "id",
                "indexed": true
            }
        ]
    },
    {
        "type": "function",
        "name": "balanceOf",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "account"
            },
            {
                "type": "uint256",
                "name": "id"
            }
        ],
        "outputs": [
            {
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "balanceOfBatch",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "accounts"
            },
            {
                "type": "uint256[]",
                "name": "ids"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]"
            }
        ]
    },
    {
        "type": "function",
        "name": "isApprovedForAll",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "account"
            },
            {
                "type": "address",
                "name": "operator"
            }
        ],
        "outputs": [
            {
                "type": "bool"
            }
        ]
    },
    {
        "type": "function",
        "name": "safeBatchTransferFrom",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "from"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256[]",
                "name": "ids"
            },
            {
                "type": "uint256[]",
                "name": "values"
            },
            {
                "type": "bytes",
                "name": "data"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "safeTransferFrom",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "from"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "id"
            },
            {
                "type": "uint256",
                "name": "value"
            },
            {
                "type": "bytes",
                "name": "data"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setApprovalForAll",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "operator"
            },
            {
                "type": "bool",
                "name": "approved"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes4",
                "name": "interfaceId"
            }
        ],
        "outputs": [
            {
                "type": "bool"
            }
        ]
    },
    {
        "type": "function",
        "name": "uri",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256"
            }
        ],
        "outputs": [
            {
                "type": "string"
            }
        ]
    }
]
