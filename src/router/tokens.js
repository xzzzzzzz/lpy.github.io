


const STORAGE_KEY="token"
export default{
	 install(Vue,options){
		Vue.prototype.getData = function () {
	      	return JSON.parse(window.localStorage.getItem(STORAGE_KEY || "[]")) 
	    }
		Vue.prototype.getDatas = function () {
			var data = this.getData();
			return data ? data.id : " ";
	    }
	 	
	 }
}
