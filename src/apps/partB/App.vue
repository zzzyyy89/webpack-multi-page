<template>
    <!--<p>part B</p>-->
  <key-board :isShowing="true" :boardType="1" />
</template>
<script>
  import KeyBoard from '../../components/CarNoKeyboard'
    export default {
        name: "app",
      components:{KeyBoard}
    }
</script>

<style lang="less">
  @import "../../assets/less/global";
</style>
