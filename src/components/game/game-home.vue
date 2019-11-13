<template>
  <section>
    <div class="game-content">
      <div class="game-table">
        <div class="game-head">start</div>
        <div calss="game-panel"></div>
        <div class="game-dashboard"></div>
      </div>
    </div>
  </section>
</template>

<script>
import * as d3 from "d3";
export default {
  data() {
    return {
      level: 0
    };
  },
  created() {},
  mounted() {
    const data = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 1, 0, 1]
      ],
      tetris_tr = d3
        .select(".game-dashboard")
        .append("div")
        .selectAll("div")
        .data(data.splice(4))
        .enter()
        .append("div");
    tetris_tr
      .selectAll("div")
      .data(d => d)
      .enter()
      .append("div")
      .style("width", "30px")
      .style("height", "30px")
      .style("background-color", d => {
        return d > 0 ? "steelblue" : "#fff";
      });
    // d3.select(".game-dashboard")
    //   .selectAll("div")
    //   .data(data)
    //   .enter()
    //   .append("div")
    //   .style("width", "30px")
    //   .style("height", "30px")
    //   .style("background-color", d => {
    //     return d > 0 ? "steelblue" : "#fff";
    //   });
    // .text(d => d);
    // const xScale = d3.time.scale().range;

    // console.log(d3);
  },
  destroyed() {},
  methods: {
    newTetris() {
      Math.round(Math.random());
    }
  }
};
</script>
 
<style>
.game-content {
  margin: 0 auto;
  width: 500px;
  padding-top: 4.5rem;
}
.game-table {
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: 1fr 5fr;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 10px 10px 8px #aaa;
  grid-template-areas:
    "head ."
    "dashboard panel";
  grid-auto-flow: row;
}
.game-head {
  border-bottom: 1px solid #ccc;
  grid-area: head;
}
.game-panel {
  border-bottom: 1px solid #ccc;
  grid-area: panel;
}
.game-dashboard {
  border: 1 solid #ccc;
  grid-area: dashboard;
}
.game-dashboard {
  width: 500px;
}
.game-dashboard div {
  line-height: 0;
}
.game-dashboard div div div {
  font: 10px sans-serif;
  display: inline-block;
  background-color: steelblue;
  text-align: right;
  padding: 3px;
  /* margin: 1px; */
  color: white;
  border: 1px solid #eee;
}
</style>