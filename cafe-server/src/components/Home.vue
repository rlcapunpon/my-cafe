<template>
  <div class="home">
    <div class="menu-bar">
      <div class="nav" v-on:click="changeActive(0)">APP ORDERS</div>
      <div class="nav" v-on:click="changeActive(1)">SPECIALS</div>
      <div class="nav" v-on:click="changeActive(2)">PASTA AND COFFEE</div>
      <div class="nav" v-on:click="changeActive(3)">DESSERTS</div>
      <div class="nav" v-on:click="changeActive(4)">COLD DRINKS</div>
      <div class="nav" v-on:click="changeActive(5)">HOT BEVERAGES</div>
    </div>
    <div v-if="active==0" class="menu-category">
      <h3>Orders</h3><br>
    </div>
    <div v-if="active==1" class="menu-category">
      <h3>Special Menu</h3><br>
      <menu-table :category="'special'"></menu-table>
    </div>
    <div v-if="active==2"  class="menu-category">
      <h3>Pasta</h3><br>
      <menu-table :category="'pasta'"></menu-table>
    </div>
    <div v-if="active==3"  class="menu-category">
      <h3>Sweet Desserts</h3><br>
      <menu-table :category="'desserts'"></menu-table>
    </div>
    <div v-if="active==4"  class="menu-category">
      <h3>Cold Drinks</h3><br>
      <menu-table :category="'colddrinks'"></menu-table>
    </div>
    <div v-if="active==5"  class="menu-category">
      <h3>Hot Beverages</h3><br>
      <menu-table :category="'hotbeverage'"></menu-table>
    </div>
  </div>
</template>

<script>
import MenuTable from './MenuTable.vue'
export default {
  name: 'Home',
  data () {
    return {
      active: localStorage.active
    }
  },
  methods: {
    changeActive (index) {
      this.active = index
      localStorage.active = index
      this.$router.go()
    }
  },
  components: {
    'menu-table': MenuTable
  }
}
</script>

<style>
.home {
  margin-top: -30px;
}

.menu-category {
  width: 100%;
  float: left;
  border: 1px solid gray;
  border-radius: 10px;
  margin-bottom: 2px;
}

.menu-category h3 {
  float: left;
  padding-left: 10px;
}

.menu-bar {
  width: 100%;
}

.nav {
  width: 15%;
  float: left;
}

.nav:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>