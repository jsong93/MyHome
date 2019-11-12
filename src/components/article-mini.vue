<template>
  <div class="article-mini">
    <h3>
      <router-link to="/article" class="article-mini-title">{{blog.title}}</router-link>
    </h3>
    <article class="article-mini-article">{{blog.article}}</article>
    <div class="article-foot">
      <div class="fa fa-calendar">2019/10/16</div>
      <div class="fa fa-folder">web</div>
      <div class="fa fa-star">0</div>
    </div>
    <!-- <hr /> -->
  </div>
</template>
<script>
export default {
  props: ["blog"]
};
</script>
<style>
.article-mini {
  padding-top: 45px;
  border-bottom: 1px solid #e1e4e8;
}
.article-mini-title {
  color: #0366d6;
  text-decoration: none;
}
.article-mini-title:hover {
  text-decoration: underline;
}
.article-mini-article {
  padding: 0 0 15px;
}
.article-foot {
  display: flex;
  flex-direction: row;
  padding-bottom: 45px;
}

.article-foot div {
  margin-right: 20px;
}
</style>