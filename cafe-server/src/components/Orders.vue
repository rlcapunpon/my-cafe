<template>
  <div class="menu-table">
    <div class="item"  v-if="item.relativeCategory === 'orders'" v-for="item in orders.items" :key="item._id">
      <div class="order">
        <div class="customer">
          Name: {{item.customer.name}}<br>
          Address: {{item.customer.address}}<br>
          Contact: {{item.customer.contact}}<br>
          <div class="order-item" v-for="orderItem in item.items" :key="orderItem.id">
            Item Name: {{orderItem.name}}<br>
            Menu: {{orderItem.menuName}}<br>
            Price: {{orderItem.price}}
          </div><br>
          Total Amount: {{item.totalAmount}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
name: 'Orders',
  data () {
    return {
      timer: ''
    }
  },
  computed: {
    ...mapState({
      orders: state => state.items.all
    })
  },
  created () {
    this.getAllOrders('orders')
    this.timer = setInterval(this.reloadPage, 5000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    ...mapActions('items', {
      getAllOrders: 'getAll'
    }),
    reloadPage () {
      this.$router.go()
    }
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

.order-item {
  border: 1px solid lightgrey;
  padding: 2px;
  border-radius: 2px;
}
</style>
