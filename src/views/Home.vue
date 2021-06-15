<template>
  <div class="home">
    <a-layout>
      <a-layout-header>
        <a-row class="project-name">NFT Parser α</a-row>
      </a-layout-header>
      <a-layout-content>
        <a-row type="flex" justify="space-between" align="middle">
          <a-col :span="16" :offset="4">
            <a-input-search
              placeholder="请输入 NFT 地址"
              enter-button="获取 NFT!"
              size="large"
              @search="fetchNFT"
            />
          </a-col>
        </a-row>
        <a-row class="token-list" type="flex" justify="space-between" align="middle">
          <a-col :span="16" :offset="4">
            <a-carousel arrows>
              <div
                slot="prevArrow"
                class="custom-slick-arrow"
                style="left: 10px; zIndex: 1"
              >
                <a-icon type="left-circle" />
              </div>
              <div
                slot="nextArrow"
                class="custom-slick-arrow"
                style="right: 10px"
              >
                <a-icon type="right-circle" />
              </div>
              <div
                v-for="pageIndex in pageCount"
                :key="pageIndex"
              >
                <a-row>
                  <a-col
                    v-for="(tokens, index) in pagedTokens[pageIndex - 1]"
                    :key="((pageIndex - 1) * eachPageSlide) + index"
                    :span="6"
                    class="token-card"
                  >
                    <token-card
                      :token="pagedTokens[pageIndex - 1][index]"
                    />
                  </a-col>
                </a-row>
              </div>
            </a-carousel>
          </a-col>
        </a-row>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import Web3 from 'web3';
import TokenCard from '../components/TokenCard.vue';

const tokens = [
  {
    token_id: 31,
    token_uri: 'https://via.placeholder.com/300',
  },
  {
    token_id: 22,
    token_uri: 'https://via.placeholder.com/300',
  },
  {
    token_id: 3645,
    token_uri: 'https://via.placeholder.com/300',
  },
  {
    token_id: 4087,
    token_uri: 'https://via.placeholder.com/300',
  },
  {
    token_id: 5112,
    token_uri: 'https://via.placeholder.com/300',
  },
  {
    token_id: 26,
    token_uri: 'https://via.placeholder.com/300',
  },
  {
    token_id: 77,
    token_uri: 'https://via.placeholder.com/300',
  },
  {
    token_id: 85,
    token_uri: 'https://via.placeholder.com/300',
  },
  {
    token_id: 29,
    token_uri: 'https://via.placeholder.com/300',
  },
];

export default {
  name: 'Home',
  components: {
    TokenCard,
  },
  data() {
    return {
      tokens,
      eachPageSlide: 4,
    };
  },
  computed: {
    tokenCount() {
      return this.tokens.length;
    },
    pageCount() {
      return Math.ceil(this.tokenCount / this.eachPageSlide);
    },
    pagedTokens() {
      const arr = [];
      for (let i = 0; i < this.pageCount; i++) {
        arr.push(tokens.slice(i * this.eachPageSlide, (i + 1) * this.eachPageSlide));
      }
      return arr;
    },
  },
  methods: {
    fetchNFT() {
      const rpcUrl = 'http://124.251.110.210:9933';
      // const rpcUrl = 'http://124.251.110.212:8080/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.4.26+commit.4563c3fc.js';
      const web3 = new Web3(rpcUrl);

      const address = '0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac';
      web3.eth.getBalance(address, (err, wei) => {
        console.log(wei);
        // 余额单位从wei转换为ether
        const balance = web3.utils.fromWei(wei, 'ether');
        console.log('balance: ', balance);
      });

      const abi = [
        {
          inputs: [
            {
              internalType: 'string',
              name: 'name_',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'symbol_',
              type: 'string',
            },
            {
              internalType: 'address',
              name: 'governance_',
              type: 'address',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'approved',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'Approval',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'bool',
              name: 'approved',
              type: 'bool',
            },
          ],
          name: 'ApprovalForAll',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'previousOwner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'OwnershipTransferred',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'Transfer',
          type: 'event',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'approve',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
          ],
          name: 'balanceOf',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'getApproved',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'governance',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
          ],
          name: 'isApprovedForAll',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'receiver',
              type: 'address',
            },
            {
              internalType: 'string',
              name: 'tokenURI',
              type: 'string',
            },
          ],
          name: 'mintNft',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'name',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'ownedTokens',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'ownerOf',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'renounceOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'safeMint',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'safeTransferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
            {
              internalType: 'bytes',
              name: '_data',
              type: 'bytes',
            },
          ],
          name: 'safeTransferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              internalType: 'bool',
              name: 'approved',
              type: 'bool',
            },
          ],
          name: 'setApprovalForAll',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes4',
              name: 'interfaceId',
              type: 'bytes4',
            },
          ],
          name: 'supportsInterface',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'symbol',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'index',
              type: 'uint256',
            },
          ],
          name: 'tokenByIndex',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'index',
              type: 'uint256',
            },
          ],
          name: 'tokenOfOwnerByIndex',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'tokenURI',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'totalSupply',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'transferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'transferOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ];
      const contract = new web3.eth.Contract(abi, address);
      // contract.methods.totalSupply().call((err, result) => { console.log(result); });
      // contract.methods.name().call((err, result) => { console.log(result); });
      // contract.methods.symbol().call((err, result) => { console.log(result); });
      // contract.methods.balanceOf(address).call((err, result) => { console.log(result); });
      contract.getPastEvents(
        'AllEvents',
        {
          fromBlock: 8717848,
          toBlock: 'latest',
        },
      ).then((events) => {
        console.log(events);
      });
    },
  },
};
</script>

<style lang="scss">
.home {
  height: 100%;

  .ant-layout {
    background-color: inherit;

    .ant-layout-header {
      background: inherit;
      height: auto;

      .project-name {
        padding: 30px 0;
        text-align: center;
        font-size: 2em;
        font-weight: bolder;
      }
    }

    .token-list {
      margin-top: 50px;
    }
  }
}

.ant-carousel {

  .slick-slider {
    text-align: center;
    height: auto;
    overflow: hidden;

    .custom-slick-arrow {
      width: 25px;
      height: 25px;
      font-size: 25px;
      color: #000;
      opacity: 0.3;

      &:before {
        display: none;
      }

      &:hover {
        opacity: 0.5;
      }
    }
  }

  .slick-slide {
    padding: 0 40px;

    &.slick-active {
      margin-bottom: 20px;
    }

    .token-card {
      display: flex;
      justify-content: center;
    }
  }

  .slick-dots li button {
    background: #69c0ff !important;
  }

  .slick-dots li.slick-active button {
    background: #1890ff !important;
  }

  .slick-dots-bottom {
    bottom: 1px !important;
  }
}
</style>
