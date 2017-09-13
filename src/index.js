import InfiniteScroll from './components/InfiniteScroll';

export default InfiniteScroll;

if (typeof window !== 'undefined' && window.Vue)
{
	window.Vue.component('InfiniteScroll', InfiniteScroll);
}