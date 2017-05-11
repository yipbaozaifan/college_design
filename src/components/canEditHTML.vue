<template>
	<h1 contenteditable="ture" @input = "channge_value($event)" v-html = "value" v-if="thisType==='h1'"></h1>
	<p contenteditable="ture" @input = "channge_value($event)" v-html = "value" v-else-if="thisType==='p'"></p>
</template>

<script>
	export default {
		name : 'editable',
		props:['value','type'],
		data(){
			return {
				innerText : this.value,
				thisType :this.type
			}
		},
		methods:{
			channge_value(e){
				this.innerText = e.target.innerHTML;
				this.$emit('input',this.innerText);
			}
		}
	}
</script>