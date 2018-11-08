<template>
  <div class="menu-table">
    List of {{getCategoryName()}}
    <div class="item" v-for="item in menu.items" :key="item.name">
      Name: {{item.name}}
      <br/>Option: {{item.option}}
      <br/>Quantity: {{item.quantity}}
    </div>
    <add-item :category="category"></add-item>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
name: 'Orders',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      orders: state => state.items.all
    })
  },
  created () {
    this.getAllOrders('orders')
  },
  methods: {
    ...mapActions('items', {
      getAllOrders: 'getAll'
    })
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
}

.delbtn {
  float: right;
  margin-top: -3px;
}
</style>
