<template>
  <div class="articlemini-container container">
    <ol class="articlemini-list">
      <li v-for="blog in blogs" :key="blog.id">
        <articlemini :blog="blog"></articlemini>
      </li>
    </ol>
    <ol class="thumbnail-list">
      <li v-for="repository in repositories" :key="repository.id">
        <thumbnail :repository="repository"></thumbnail>
      </li>
    </ol>
  </div>
</template>

<script>
import articlemini from "@/components/article-mini";
import thumbnail from "@/components/thumbnail";
// import ProtrudingSquares from "@/assets/svg/Protruding-Squares.svg";
// import ConfettiDoodles from "@/static/svg/Confetti-Doodles.svg";
// import FlatMountains from "@/static/svg/Flat-Mountains.svg";
// import HollowedBoxes from "@/static/svg/Hollowed-Boxes.svg";
// import RadiantGradient from "@/static/svg/Radiant-Gradient.svg";
// import RepeatingChevrons from "@/static/svg/Repeating-Chevrons.svg";
// import TortoiseShell from "@/static/svg/Tortoise-Shell.svg";
// import ZigZag from "@/static/svg/Zig-Zag.svg";

export default {
  data() {
    return {
      blogs: [
        { id: "1", title: "你常解释", article: "你最近不说话，怎么了" },
        { id: "2", title: "我们不是适合", article: "你最近不说话，怎么了" },
        { id: "3", title: "你常解释", article: "你最近不说话，怎么了" },
        { id: "4", title: "你常解释", article: "你最近不说话，怎么了" },
        { id: "5", title: "你常解释", article: "你最近不说话，怎么了" },
        { id: "6", title: "你常解释", article: "你最近不说话，怎么了" },
        { id: "7", title: "你常解释", article: "你最近不说话，怎么了" },
        { id: "8", title: "你常解释", article: "你最近不说话，怎么了" },
        { id: "9", title: "你常解释", article: "你最近不说话，怎么了" },
        { id: "10", title: "你常解释", article: "你最近不说话，怎么了" },
        { id: "11", title: "你常解释", article: "你最近不说话，怎么了" },
        { id: "12", title: "你常解释", article: "你最近不说话，怎么了" },
        { id: "13", title: "你常解释", article: "你最近不说话，怎么了" },
        { id: "14", title: "你常解释", article: "你最近不说话，怎么了" },
        { id: "15", title: "你常解释", article: "你最近不说话，怎么了" },
        { id: "16", title: "你常解释", article: "你最近不说话，怎么了" },
        { id: "17", title: "你常解释", article: "你最近不说话，怎么了" },
        { id: "18", title: "你常解释", article: "你最近不说话，怎么了" }
      ],
      repositories: [
        {
          id: "1",
          title: "javascript",
          info:'javascript练习',
          imagesrc: "Protruding-Squares.svg"
        },
        {
          id: "2",
          title: "vue",
          info:'javascript练习',
          imagesrc: "Rainbow-Vortex.svg"
        },
        {
          id: "3",
          title: "java",
          info:'javascript练习',
          imagesrc: "Flat-Mountains.svg"
        },
        {
          id: "4",
          title: "go",
          info:'javascript练习',
          imagesrc: 'Hollowed-Boxes.svg'
        },
        {
          id: "5",
          title: "c++",
          info:'javascript练习',
          imagesrc: 'Radiant-Gradient.svg'
        },
        {
          id: "6",
          title: "c#",
          info:'javascript练习',
          imagesrc: 'Repeating-Chevrons.svg'
        },
        {
          id: "7",
          title: "c",
          info:'javascript练习',
          imagesrc: 'Tortoise-Shell.svg'
        },
        {
          id: "8",
          title: "ruby",
          info:'javascript练习',
          imagesrc: 'Zig-Zag.svg'
        },
        {
          id: "9",
          title: "python",
          info:'javascript练习',
          imagesrc: 'Zig-Zag.svg'
        },
        {
          id: "10",
          title: "javascript",
          info:'javascript练习',
          imagesrc: 'Zig-Zag.svg'
        },
        {
          id: "11",
          title: "javascript",
          info:'javascript练习',
          imagesrc: 'Zig-Zag.svg'
        }
      ]
    };
  },
  components: {
    articlemini,
    thumbnail
  }
};
</script>

<style>
ol {
  list-style: none;
}

.articlemini-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: "two one";
  grid-column-gap: 20px;
}
.articlemini-blog {
  grid-area: two;
}
</style>