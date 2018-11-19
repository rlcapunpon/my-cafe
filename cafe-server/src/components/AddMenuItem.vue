<template>
  <div class="add-menu">
    Add New {{getCategoryName()}}
    <div>
      <form class="form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name:</label><br/>
          <input type="text" name="name" v-model="input.name" placeholder="Name of Menu Item" />
        </div>
        <div class="form-group">
          <label for="description">Description:</label><br/>
          <textarea name="description" v-model="input.description"></textarea>
        </div>
        <div class="form-group">
          <label for="imageUrl">Image URL:</label><br/>
          <input type="text" name="imageUrl" v-model="input.picture.large" placeholder="Link to Image" />
        </div>
        <div class="form-group">
          <label for="options">Options:</label><br/>
          <div class="span">Name</div><div class="span">Price</div>
          <input class="options" type="text" name="option1name" v-model="input.options[0].name" placeholder="Small" />
          <input class="options" type="number" name="option1price" v-model="input.options[0].price" placeholder="75" />
          <input class="options" type="text" name="option2name" v-model="input.options[1].name" placeholder="Medium" />
          <input class="options" type="number" name="option2price" v-model="input.options[1].price" placeholder="85" />
          <input class="options" type="text" name="option3name" v-model="input.options[2].name" placeholder="Large" />
          <input class="options" type="number" name="option3price" v-model="input.options[2].price" placeholder="95" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
name: 'AddMenuItem',
props: ['category'],
computed: {
    ...mapState('items', ['status'])
  },
data () {
    return {
       input: {
        name: '',
        description: '',
        category: this.getCategoryValue(this.category),
        picture: {large:''},
        options: [{name:'',price:0},{name:'',price:0},{name:'',price:0}],
        relativeCategory: this.category
       }
    }
  },
  methods: {
    ...mapActions('items', ['additem']),
    getCategoryName () {
      switch (this.category) {
        case 'special': return 'Special Menu'
        case 'pasta': return 'Pasta w/ Brewed Coffee'
        case 'desserts': return 'Desserts'
        case 'colddrinks': return 'Cold Drinks'
        case 'hotbeverage': return 'Hot Beverages'
      }
    },
    getCategoryValue (category) {
      if (category === 'pasta') {
        return 'Special Menu'
      } else {
        return this.getCategoryName()
      }   
    },
    handleSubmit (e) {
      console.log(this.category)
      console.log(JSON.stringify(this.input))
      this.additem(this.input)
      this.$emit('addSubmit')
      this.clearItem()
      this.$router.go()
    },
    clearItem () {
      let input = {
        name: '',
        description: '',
        category: '',
        picture: {large:''},
        options: [{name:'',price:0},{name:'',price:0},{name:'',price:0}],
        relativeCategory: this.category
       }
       this.input = input
    }
  }
}
</script>
<style>
.add-menu {
  width: 98%;
  float: left;
  text-align: left;
  padding: 1%;
}

.form {
  border: 1px dotted gray;
  border-radius: 5px;
  padding: 4px;
}

input, textarea {
  width: 50%;
  max-width: 90%;
  padding: 3px;
  margin: 1px;
  border: 1px solid #a7a7a7;
  border-radius: 3px;
}

input.options {
  width: 47%;
}

button {
  float: right;
  margin-top: 10px;
}

.span {
  width: 49%;
  float: left;
}
</style>