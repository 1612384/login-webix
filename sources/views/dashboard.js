import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView{
	config(){
		const header = {
			type:"header", css:"custom_dark", height:58,
			template:"ADMIN APP"
		};

		const sidebar = {
			localId:"menu",
			view:"sidebar", css:"webix_dark", width:200,
			data:[
				{ id:"dash", value:"Dashboard", icon:"mdi mdi-view-dashboard" },
			]
		};

		const toolbar = {
			view:"toolbar",
			padding:9, height:58,
			cols:[
				{ css:"logo" },
				{ view:"icon", icon:"mdi mdi-logout",
					click:() => {
						this.app.show("/login");
					}
				},
				{
					template:`<image class="mainphoto" src="data/images/morgan_yu.jpg">
					<span class="webix_icon mdi mdi-circle status green"></span>`,
					width:60, css:"avatar",	borderless:true
				}
			]
		};

		return {
			type:"clean", cols:[
				{ rows:[ header, sidebar ]},
				{ rows:[ toolbar, { $subview:true } ]}
			]
		};
	}

	init(){
		this.use(plugins.Menu, "menu");
	}
}