<template>
  <div class="token-card">
    <a-card
      :title="'NFT ID: ' + tokenId"
      style="width: 80%"
    >
      <img
        slot="cover"
        alt="uri"
        :src="tokenUri"
      />
      <p>{{ intro }}</p>
      <p>{{ add1 }}</p>
      <p>{{ add2 }}</p>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'TokenCard',
  props: {
    token: Object,
  },
  data() {
    return {
      tokenId: null,
      tokenUri: null,
      intro: null,
      add1: null,
      add2: null,
    };
  },
  created() {
    this.normalize()
  },
  methods: {
    normalize() {
      this.tokenId = this.token.tokenId
      this.tokenUri = this.token.tokenUri
      this.intro = JSON.parse(this.token.evidence[0].replaceAll("'", '\"'))
      this.add1 = this.token.evidence[1]
      this.add2 = this.token.evidence[2]
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
