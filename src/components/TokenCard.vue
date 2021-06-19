<template>
  <div class="token-card">
    <a-card
      v-if="extra"
      :title="evidenceKey"
    >
      <div class="nft-img">
        <img :src="tokenUri">
      </div>
      <div class="nft-extra">
        <span>资源名称：</span>
        <span>{{ extra.name }}</span>
      </div>
      <div class="nft-extra">
        <span>资源描述：</span>
        <span>{{ extra.description }}</span>
      </div>
      <div class="nft-extra">
        <span>资源链接：</span>
        <a :href="extra.url">{{ extra.url }}</a>
      </div>
      <div class="nft-extra">
        <span>生效时间：</span>
        <span>{{ extra.effective_date }}</span>
      </div>
      <div class="nft-extra">
        <span>过期时间：</span>
        <span>{{ extra.expiration_date }}</span>
      </div>
    </a-card>
  </div>
</template>

<script>
import * as dayjs from 'dayjs'

export default {
  name: 'TokenCard',
  props: {
    token: Object,
  },
  data() {
    return {
      evidenceKey: null,
      tokenUri: null,
      extra: null,
    };
  },
  mounted() {
    this.normalize()
  },
  methods: {
    normalize() {
      this.evidenceKey = this.token.evidenceKey
      this.tokenUri = this.token.tokenUri
      const intro = JSON.parse(this.token.evidence[0].replaceAll("'", '\"'))

      this.extra = {
        name: intro.name,
        description: intro.description,
        url: intro.url,
        effective_date: dayjs(intro.effective_date).format('YYYY-MM-DD HH:mm:ss'),
        expiration_date: dayjs(intro.expiration_date).format('YYYY-MM-DD HH:mm:ss'),
        gene: intro.gene,
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.ant-card {
  width: 60%;
}

.ant-card-head-title {
  white-space: normal !important;
  text-overflow: unset !important;
  overflow-wrap: anywhere;
}

.nft-img {
  padding-bottom: 100%;
  position: relative;

  img {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 100%;
    max-height: 100%;
  }
}

.nft-extra {
  text-align: left;
  padding: 5px 0;
}
</style>
