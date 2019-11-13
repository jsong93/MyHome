<template>
  <div>
    <header class="site-header">
      <div class="container">
        <h1>
          <a>
            <span class="fa fa-github" tile="jsong"></span>
          </a>Jsong
        </h1>
        <nav class="site-header-nav">
          <router-link to="/home" class="site-header-nav-item">Home</router-link>
          <router-link to="/blog" class="site-header-nav-item">Blog</router-link>
          <router-link to="/home" class="site-header-nav-item">Open-source</router-link>
          <router-link to="/game" class="site-header-nav-item">Game</router-link>
          <router-link to="/home" class="site-header-nav-item">About</router-link>
        </nav>
      </div>
    </header>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
// import VueRouter from "vue-router";
export default {};
</script>

<style>
.site-header {
  background: rgb(34, 200, 206);
  height: 3.5rem;
  padding-top: 5px;
  position: fixed;
  width: 100%;
  z-index: 1;
}
.site-header h1 {
  float: left;
  color: #fff;
  margin: 0;
}
.site-header h1::before {
  float: left;
  color: #fff;
}
.container {
  max-width: 1020px;
  width: auto;
  margin-left: auto;
  margin-right: auto;
}
.site-header-nav {
  float: right;
  margin: 0 20px;
  max-width: 1020px;
  font-size: 1rem;
  /* color: rgba(255, 255, 255, 0.5); */
}
.site-header-nav-item {
  padding: 13px 10px 10px;
  display: inline-block;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
}

.site-header-nav-item:hover {
  color: #fff;
  cursor: pointer;
}
</style>