'use strict'

import { Toast,Indicator } from 'mint-ui';
export default {
  //简短的消息提示框
  toast :function(message){
		return Toast({
		  message: message,
		  position: 'middle',
		  duration: 2000
		});
	},
	//加载提示框
	indicator (message){
		return Indicator.open({
		  text: message || '加载中...',
		  spinnerType: 'snake'
		});
	},
	closeIn(){
		return Indicator.close()
	}
}

