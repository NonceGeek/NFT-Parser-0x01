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
      console.log('hello world!');
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
