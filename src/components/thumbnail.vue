<template>
  <div class="thumbnail">
    <div
      class="thumbnail-image"
      :style="{'background-image': 'url('+require('@/assets/svg/'+repository.imagesrc)+')'}"
    >
      <div class="thumbnail-title">
        <h3>{{repository.title}}</h3>
      </div>
    </div>
    <div class="thumbnail-info">{{repository.info}}</div>
    <div class="thumbnail-foot">
      <div class="fa fa-star"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["repository"]
};
</script>

<style>
.thumbnail {
  /* border: 1px solid #e1e4e8; */
  border: 1px solid rgba(0, 0, 0, 0.075);
  border-bottom-color: rgba(0, 0, 0, 0.125);
  border-radius: 5px;
  height: 170px;
  margin-top: 45px;
  opacity: 0.8;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 5px 10px rgba(0, 0, 0, 0.05);
  transition: border-color 0.1s ease-in-out, border-shadow 0.1s ease-in-out;
  text-align: center;
  /* display: table;
  width: 100%;
  text-align: center; */
}

.thumbnail:hover {
  border: 1px solid #e1e4e8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05), 0 10px 18px rgba(0, 0, 0, 0.1);
  opacity: 1;
  cursor: pointer;
}

.thumbnail-title {
  display: table-cell;
  vertical-align: middle;
  color: #fff;
}

.thumbnail-image {
  /* background-image: url(../static/svg/Protruding-Squares.svg); */
  height: 70%;
  /* margin: 5px; */
  border-radius: 5px;
  display: table;
  width: 100%;
  text-align: center;
}

.thumbnail-info {
  font-size: 0.7em;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
}
</style>