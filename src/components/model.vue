<template>
	<div class="modal-content">
		<transition name = "cover">
			<div class="modal_mask" @click = "close()" v-show = "show"></div>
		</transition>
		<transition name = "fade">
			<div class="modal_window" v-show = "show">
				<div class="modal_header">
					<slot name = "modal-header"></slot>
				</div>
				<div class="modal_body">
					<slot name = "modal-body"></slot>
				</div>
				<div class="modal_footer">
					<slot name = "modal-footer"></slot>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		props:{
			width: Number,
			effect : String,
			show : Boolean
		},
		data(){
			return {
				window_width : this.width,
				model_effect : this.effect,
				is_show : this.show
			}
		},
		created(){
		},
		methods:{
			close(){
				this.$emit('close')
			}
		}
	}
</script>

<style>
	.modal_mask{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 1000;
		background: rgba(3,3,3,0.8);
	}
	.modal_window{
		background-color: #fff;
		position: fixed;
		top: 50%;
		left: 50%;
		width: 50%;
		height: auto;
		padding: 10px;
		z-index: 2000;
		border-radius: 5px;
		box-shadow: #fff 0 0 1px;
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		backface-visibility: hidden;
	    transform: translateX(-50%) translateY(-50%);
	}
	.modal_header{
		border-bottom:1px solid #20a0ff;
		padding-bottom: 10px;
		color: #20a0ff;
		margin-bottom:10px;   
	}
	.modal_body{
		border-bottom: #ccc 1px solid;
		margin-bottom: 10px;
	}
	.modal_footer{
		text-align: center;
	}
	.fade-enter-active{
		opacity: 1;
	    transform: translateX(-50%) translateY(-50%) scale(1);
		transition: all 0.3s;
	}
	.fade-leave-active,.cover-enter-active,.cover-leave-active{
		transition: all 0.3s;
	}
	.fade-enter, .fade-leave-active{
		opacity: 0;
	    transform: translateX(-50%) translateY(-50%) scale(0.7);
	}
	.cover-enter-active{
		opacity: 1;
	}
	.cover-enter,.cover-leave-active{
		opacity: 0;
	}
</style>