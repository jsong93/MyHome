<template>
  <section>
    <header class="banner">
      <div class="container">学不可以已</div>
      <div class="container">
        <span class="fa fa-map-marker info">Shenyang</span>
      </div>
    </header>
    <article class="site-article">
      <articlelist></articlelist>
    </article>
  </section>
</template>

<script>
import articlelist from "@/components/article-list";
export default {
  components: {
    articlelist
  }
};
</script>

<style>
.banner {
  background: rgb(34, 200, 206);
  color: #fff;
  padding-top: 3.5rem;
  z-index: 1;
  /* width: 100%; */
  /* font-size: 3rem; */
}

.info {
  font-size: 16px;
}
.banner .container {
  font-size: 3rem;
}
</style>