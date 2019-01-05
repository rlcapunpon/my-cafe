<template>
  <div class="menu-table">
    <div class="item"  v-if="item.relativeCategory === 'orders'" v-for="item in orders.items" :key="item._id">
      <div class="order">
        <div class="customer">
          Name: {{item.customer.name}}<br>
          Address: {{item.customer.address}}<br>
          Contact: {{item.customer.contact}}<br>
          Email: {{item.customer.email}}<br>
          <div class="order-item" v-for="orderItem in item.items" :key="orderItem.id">
            Item Name: {{orderItem.name}}<br>
            Menu: {{orderItem.menuName}}<br>
            Price: {{orderItem.price}}
          </div><br>
          Total Amount: {{item.totalAmount}}
        </div>
      </div>
      <div class="status">
        <button v-bind:class="{ currentStatus : item.status === 2 }" v-on:click="changeOrderStatus(item, 2)" v-if="parseInt(item.status) + 1 >= 2 " class="status-change">Completed</button>
        <button v-bind:class="{ currentStatus : item.status === 1 }" v-on:click="changeOrderStatus(item, 1)" v-if="parseInt(item.status) <= 1" class="status-change">Preparing</button>
        <button v-bind:class="{ currentStatus : item.status === 0 }" v-if="parseInt(item.status) === 0" class="status-change received">Received</button>
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
      getAllOrders: 'getAll',
      changeStatus: 'changeStatus'
    }),
    reloadPage () {
      this.$router.go()
    },
    changeOrderStatus(item, value) {
      var values = ["Received", "Preparing", "Completed"]
      alert("Changing Status to: " + values[value])
      if( item.status < value ) {
        item.status = value
        this.changeStatus(item._id)
      }
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

.status {
  width: 400px;
  float: right;
  margin-top: -41px;
}

.status-change {
  width: 30%;
  height: 40px;
  margin: 5px;
  border: 1px solid gray;
  border-radius: 5px;
  float: right;
  display: block;
}

.status .status-change:hover, .currentStatus {
  border: 1px solid green;
  cursor: pointer;
  background: green;
  color: white;
}

.status .received, .status .received:hover, .currentStatus:hover {
  color: white;
  cursor: auto;
}
</style>
