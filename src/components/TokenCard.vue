<template>
  <div class="token-card">
    <a-card
      :title="'NFT ID: ' + token.tokenId"
      style="width: 80%"
    >
      <img
        slot="cover"
        alt="uri"
        :src="token.tokenUri"
      />
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'TokenCard',
  props: {
    token: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
