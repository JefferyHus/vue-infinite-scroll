<template>
	<div class="infinite-scroll spinner-container">
		<div class="row" v-show="isLoading">
			<span class="spinner">
				<vue-simple-spinner size="medium" message="Loading..." speed="0.4"></vue-simple-spinner>
			</span>
		</div>
		<div class="row" v-show="isComplete">
			<p class="spinner">No more data</p>
		</div>
	</div>
</template>

<script>
	import VueSimpleSpinner from 'vue-simple-spinner'

	export default {
		name: "InfiniteScroll",
		data: function () {
			return {
				isLoading: false,
				isComplete: false,
				scrollHandler: null
			}
		},
		props: {
			loading: {
				type: Boolean,
				default: false
			},
			method: Function,
			timeout: {
				type: Number,
				default: 700
			}
		},
		methods: {
			handleScroll: function (e) {
				// calculate the distance
				var distance = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight;

			    if (distance && !this.isComplete)
			    {
			    	this.isLoading = true

					setTimeout(() => {
						this.method.call()
						this.isLoading = false
					}, this.timeout)
			    }
			    else
			    {
			    	this.isLoading = false
			    }
			}
		},
		mounted: function () {

			this.scrollHandler = function scrollHandlerOriginal() {
				if (!this.isLoading)
				{
				  this.handleScroll();
				}
			}.bind(this);

			window.addEventListener('scroll', this.scrollHandler)

			this.$on('$InfiniteScrolling:complete', () => {
				this.isLoading = false
				this.isComplete = true
				window.removeEventListener('scroll', this.scrollHandler)
			})

			this.$on('$InfiniteScrolling:stop', () => {
				this.isLoading = true
				window.removeEventListener('scroll', this.scrollHandler)
			})

			this.$on('$InfiniteScrolling:reset', () => {
				this.isLoading  = false
				this.isComplete = false
				window.addEventListener('scroll', this.scrollHandler)
			})
		},
		destroyed: function () {
			// hide the scroller
			this.isLoading = false
			this.isComplete = false
			window.removeEventListener('scroll', this.handleScroll)
		},
		components: { VueSimpleSpinner }
	}
</script>

<style scoped>
	
.row {
    margin-right: 0;
    margin-left: 0;
}

.spinner-container{
	padding-top: 15px;
	padding-bottom: 15px;
	z-index: 999;
	float: none;
	margin-top: 10px;
}

.spinner{
    display: flex;
    margin: 0 auto;
}

</style>