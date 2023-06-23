<template>
  <section class="section">
    <div class="box" v-for="(item, key) in news" :key="key">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure>
                <img  v-bind:src="item.imageurl" alt=""/>
              </figure>
            </div>
            <div class="media-content">
              <a v-bind:href="item.guid" target="_blank">{{item.title}}</a>
            </div>
          </div>
          <div class="content">
            {{item.body}}
            <br/>
            <br/>
            <nav class="level is-mobile">
              <div class="level-right">
                <div class="level-item tags has-addons">
                  <span class="tag"><i>source : </i></span>
                  <span class="tag is-primary">{{item.source}}</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'NewsView',
  setup() {
    const store = useStore();
    const news = ref<any[]>();

    const getNews = async () => {
      news.value = await store.dispatch('news/getNews');
    };

    onMounted(() => getNews());

    return {
      news,
      getNews,
    };
  },
});
</script>

<style scoped>

  .box {
    background-color: #fff;
    width: 80%;
    margin: 20px auto;
    padding: 20px;
    border-radius: 10px;
  }

  .box .card {
    padding: 20px;
    border: 1px solid #DDD;
  }

  .box .card .content {
    margin: 0;
    text-align: justify;
    font-size: 18px;
    line-height: 24px;
    width: 100%;
  }

  .box .card .card-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .box .card .media {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 20px;
  }

  .box .card .media .media-content {
    margin: 0 auto;
  }

  .box .card .media .media-content a {
    text-decoration: none;
    font-size: 36px;
    color: #2c3e50;
    text-align: left;
    display: block;
    margin-left: 20px;
  }
  .box .card .media figure {
    margin: 0;
  }

  .box .card .media figure img {
    width: 150px;
  }

 a.title:hover{
  color:#3273dc;
 }
</style>
