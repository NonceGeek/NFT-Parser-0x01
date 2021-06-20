import web3 from "./index"

const evidenceFactoryAddress = '0x493275370aF3f63d9ccd10a6539435121cF4fbb9'
const evidenceAbi = [
  {
    constant: true,
    inputs: [{ name: "key", type: "string" }],
    name: "getEvidenceByKey",
    outputs: [
      { name: "", type: "string" },
      { name: "", type: "address[]" },
      { name: "", type: "address[]" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "addr", type: "address" }],
    name: "addSignatures",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "index", type: "uint256" }],
    name: "getSigner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "addr", type: "address" }],
    name: "getEvidence",
    outputs: [
      { name: "", type: "string" },
      { name: "", type: "address[]" },
      { name: "", type: "address[]" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "addr", type: "address" }],
    name: "verify",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getSigners",
    outputs: [{ name: "", type: "address[]" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "evi", type: "string" }],
    name: "newEvidence",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "evi", type: "string" },
      { name: "key", type: "string" }
    ],
    name: "newEvidenceByKey",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getSignersSize",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "evidenceSigners", type: "address[]" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "addr", type: "address" }],
    name: "newEvidenceEvent",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "addr", type: "address" },
      { indexed: false, name: "key", type: "string" }
    ],
    name: "newEvidenceEventWithKey",
    type: "event"
  }
]

const evidenceContract = new web3.eth.Contract(evidenceAbi, evidenceFactoryAddress)

const chainId = 1281
const erc721ContractAddress = '0x962c0940d72E7Db6c9a5F81f1cA87D8DB2B82A23'

export {
  evidenceContract,
  erc721ContractAddress,
  chainId,
}