<template>
  <section class="index container">
    <div>
      <HeaderHtml/>
      <logo/>
      <h1 class="title">
        nuxt-pro
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
      <router-link to="/order/onlineOrder">下单</router-link><br/>
      <router-link to="/order/2">下单id</router-link>
      <botton @click='order()' class='test'>onlineOrder</botton>
      <div class='test1'>123
        <div class='test2'>3254</div>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import HeaderHtml from '~/components/Header.vue'
import api from '~/plugins/api'
import utils from '~/plugins/utils'
// import axios from '~/plugins/axios.js'
export default {
  name: 'index',

  components: {
    Logo,
    HeaderHtml
  },

  props: {
    type: String
  },
  computed: {},

  beforeMount () {
    var data = {
      'cityId':'110100'
    }
    // api.axiosAll(function(res){
    //     console.log(res)
    // },[api.getHomePageInfoWithCity(data)])
    //console.log(indata)
    console.log(api)
    api.getHomePageInfoWithCity(data, function (res) {
      
      //self.indexData = res;
      //console.log(self.indexData)
    })
  },

  beforeDestroy () {
  },

  watch: {
  },

  methods: {
    order () {
      this.$router.push('/order/onlineOrder')
    }
  },
  async asyncData ({ app }) {
    try {
      const { data } = await app.$axios.get(`quhu/accompany/public/V2/getHomePageInfoWithCity?cityId=110100`)

      return {
        hotList: data
      }
    } catch (err) {
      console.error(err)
    }
  }
  // asyncData ({ params, error }) {
  //   return axios.get(`/quhu/accompany/public/V2/getHomePageInfoWithCity?cityId=110100`)
  //   .then((res) => {
  //     return { data: res.data }
  //   })
  //   .catch((e) => {
  //     error({ statusCode: 404, message: 'Post not found' })
  //   })
  // }
}
</script>
<style lang="sass">
  .test1
    width: 100px
    .test2
      width: 10px

</style>
<style>
.container
{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title
{
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle
{
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links
{
  padding-top: 15px;
}
</style>
