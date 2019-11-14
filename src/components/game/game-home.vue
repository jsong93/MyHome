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
      tetris_tr: null,
      level: 0,
      newBlock: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      grid: [
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    };
  },
  created() {},
  mounted() {
    this.newTetris();
    this.tetris_tr = d3
      .select(".game-dashboard")
      // .append("div")
      .selectAll("div")
      .data(this.newBlock.concat(this.grid))
      .enter()
      .append("div")
      .classed("game-dashboard-tr", true)
      .selectAll("div")
      .data(d => d)
      .enter()
      .append("div")
      .classed("game-dashboard-td", true)
      .style("width", "1rem")
      .style("height", "1rem")
      .style("background-color", d => {
        return d > 0 ? "steelblue" : "#fff";
      });
    // .text(d => d);

    // const data = [[1, 2], [3, 4]];
    // d3.selectAll("p")
    //   // .append("div")
    //   // .selectAll("div")
    //   .data(data)
    //   .enter()
    //   .append("p")
    //   .classed("a", true)
    //   .selectAll("div")
    //   .data(d => d)
    //   .enter()
    //   .append("div")
    //   .classed("b", true)
    //   .text(d => d);
    setInterval(() => {
      this.newTetris();
      this.draw();
      this.move();
    }, 1000);
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
    // 生成新方块
    newTetris() {
      let a = 3;
      let i = 3,
        j = 4;
      this.newBlock = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ];
      this.newBlock[i][j] = 1;
      // 一行一行画 判断位置 凸画的不好 从底下向上画
      while (a > 0) {
        switch (Math.round(Math.random())) {
          // 同行
          case 0:
            // 一行大于两个
            if (this.newBlock[i][j + 1] + this.newBlock[i][j - 1] > 0) {
              if (a < 2) {
                if (this.newBlock[i][j + 1] + this.newBlock[i][j - 1] > 1) {
                  this.newBlock[i][
                    this.newBlock[i][j - 1] > 0 ? j - 2 : ++j
                  ] = 1;
                } else {
                  // this.newBlock[--i][
                  //   this.newBlock[i][j - 1] > 0 ? j - 2 : ++j
                  // ] = 1;
                  this.newBlock[i][j - 1] > 0
                    ? (this.newBlock[--i][--j] = 1)
                    : (this.newBlock[i][++j] = 1);
                }
              } else {
                this.newBlock[i][this.newBlock[i][j - 1] > 0 ? ++j : --j] = 1;
              }
            } else {
              switch (Math.round(Math.random())) {
                case 0:
                  this.newBlock[i][++j] = 1;
                  break;
                case 1:
                  this.newBlock[i][--j] = 1;
                  break;
                default:
                  this.newBlock[i][++j] = 1;
                  break;
              }
            }
            break;
          // 换行
          case 1:
            this.newBlock[--i][j] = 1;
            break;
          default:
            this.newBlock[--i][j] = 1;
            break;
        }
        a--;
      }
    },
    move() {
      let i = 0;
      for (const tr of this.newBlock) {
        const trB = tr.join(""),
          trD = trB * 1;
        // TODO 二进制判断
        if ((trD ^ trD) >= (tr.join("") | this.grid[i].join(""))) {
          //  console.log(1);
        }
      }
      // for (let i = 3; i < this.grid.length; i++) {
      //   if (i + 1 < this.grid.length) {
      //     for (let j = 0; j < this.grid[i].length; j++) {
      //       if (this.grid[i][j] + this.grid[i + 1][j] > 1) {
      //       }
      //     }
      //   }
      // }
    },
    draw() {
      d3.selectAll(".game-dashboard-tr")
        .data(this.newBlock)
        .selectAll(".game-dashboard-td")
        .data(d => d)
        .style("background-color", d => {
          return d > 0 ? "steelblue" : "#fff";
        });
    }
  }
};
</script>

<style>
.game-content {
  margin: 0 auto;
  width: 25rem;
  padding-top: 4.5rem;
}
.game-table {
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: 1fr 5fr;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 10px 10px 8px #aaa, -10px 10px 8px #aaa;
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
  width: 25rem;
}
.game-dashboard div {
  line-height: 0;
}
.game-dashboard div div {
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
