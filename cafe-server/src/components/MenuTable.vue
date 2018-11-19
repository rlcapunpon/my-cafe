<template>
  <div class="menu-table">
    List of {{getCategoryName()}}
    <div class="item" v-if="item.relativeCategory === category" v-for="item in menu.items" :key="item._id">
      Name: {{item.name}}
      <br/>Description: {{item.description}}
      <br/>Image: {{item.picture.large}}
      <br/>Options:
      <br/> 
      <div v-for="option in item.options" v-if="option.name !== ''" :key="option.name">
        [Name: {{option.name}} - Price: {{option.price}}]
      </div>
      <button class="delbtn" v-on:click="deleteItemGateway(item._id)">Delete</button>
    </div>
    <add-item :category="category" v-on:addSuccess="reload"></add-item>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddMenuItem from './AddMenuItem.vue'
export default {
name: 'MenuTable',
props: ['category'],
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      menu: state => state.items.all
    })
  },
  created () {
    this.getAllItems(this.category)
  },
  methods: {
    ...mapActions('items', {
      getAllItems: 'getAll',
      deleteItem: 'delete'
    }),
    getCategoryName () {
      switch (this.category) {
        case 'special': return 'Special Menu'
        case 'pasta': return 'Pasta w/ Brewed Coffee'
        case 'desserts': return 'Desserts'
        case 'colddrinks': return 'Cold Drinks'
        case 'hotbeverage': return 'Hot Beverages'
      }
    },
    deleteItemGateway (id) {
      var item = {}
      item.id = id
      item.relativeCategory = this.category
      this.deleteItem(item)
      this.getAllItems(this.category)
      this.$router.go()
    },
    reload () {
      this.$router.go()
    },
    getId(id) {
      return id + this.category
    }
  },
  components: {
    'add-item': AddMenuItem
  }
}
</script>
<style>
.menu-table {
  width: 98%;
  float: left;
  text-align: left;
  padding: 1%;
}

.item {
  border: 1px solid #bfbfbf;
  padding: 4px;
  margin-bottom: 3px;
}

.delbtn {
  float: right;
  margin-top: -25px;
}
</style>
