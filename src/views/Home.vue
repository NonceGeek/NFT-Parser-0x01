<template>
  <div class="home">
    <a-layout>
      <a-layout-header>
        <a-row class="project-name">NFT Parser α</a-row>
      </a-layout-header>
      <a-layout-content>
        <!-- 用户输入地址并显示 NFT -->
        <a-row type="flex" justify="space-between" align="middle">
          <a-col :span="16" :offset="4">
            <a-input-search
              :default-value="nftAddress"
              enter-button="获取 NFT!"
              size="large"
              @search="fetchNFT"
            />
          </a-col>
        </a-row>
        <!-- 横向显示 NFT 列表 -->
        <a-row
          v-if="showSlides"
          class="token-list"
          type="flex"
          justify="space-between"
          align="middle"
        >
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
                    :span="12"
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
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import erc721Contract from '@/web3/erc721Contract';
import {
  evidenceContract,
  contractAddress,
  chainId,

} from '@/web3/evidenceContract';
import TokenCard from '../components/TokenCard.vue';

export default {
  name: 'Home',
  components: {
    TokenCard,
  },
  data() {
    return {
      nftAddress: '0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac',
      tokens: [],
      eachPageSlide: 2,
      showSlides: false,
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
        arr.push(this.tokens.slice(i * this.eachPageSlide, (i + 1) * this.eachPageSlide));
      }
      return arr;
    },
  },
  methods: {
    async fetchNFT() {
      console.clear()

      //测试合约里面的三个方法

      // 调用balanceOf(nftAddress)返回地址为address的用户的NFT数量
      // 结果：2，即地址为address的用户所有拥有的NFT数量是2
      const tokenLength = await this.asyncBalanceOf(this.nftAddress)

      // 调用tokenOfOwnerIndex(nftAddress, index)，目的是根据索引值index返回地址为address的用户的tokenID
      // 索引是从0开始，tokenID是1开始
      // eg:当前用户所拥有的NFT数量为2，那么索引就是0 1 通过0或者1就可以找到对应NFT的tokenID
      for (let i = 0; i < tokenLength; i++) {
        let tokenId = await this.asyncTokenOfOwnerByIndex(this.nftAddress, i)
        this.tokens.push({
          tokenId: parseInt(tokenId),
        })
      }

      // tokenID的作用是为了找到对应的NFT
      for (let i = 0; i < this.tokens.length; i++) {
        const tokenUri = await this.asyncTokenURI(this.tokens[i].tokenId)
        this.tokens[i].tokenUri = tokenUri

        const evidenceKey = `${chainId}:${contractAddress}:${this.tokens[i].tokenId}`
        const result = await this.asyncGetEvidenceByKey(evidenceKey)
        this.tokens[i].evidence = result
      }

      this.showSlides = true
    },
    asyncBalanceOf(nftAddress) {
      return new Promise((resolve, reject) => {
        erc721Contract.methods.balanceOf(nftAddress).call((err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    },
    asyncTokenOfOwnerByIndex(nftAddress, tokenIndex) {
      return new Promise((resolve, reject) => {
        erc721Contract.methods.tokenOfOwnerByIndex(nftAddress, tokenIndex).call((err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    },
    asyncTokenURI(tokenId) {
      return new Promise((resolve, reject) => {
        erc721Contract.methods.tokenURI(tokenId).call((err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    },
    asyncGetEvidenceByKey(evidenceKey) {
      return new Promise((resolve, reject) => {
        evidenceContract.methods.getEvidenceByKey(evidenceKey).call((err, result) => {
          if (err) reject(err);
          resolve(result);
        });
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
