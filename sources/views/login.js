import {JetView} from "webix-jet";
function login(form,ui){
	if (form.validate()){
		var values = form.getValues();
		webix.ajax().get("http://localhost:8080/login", values).then(function(data){
			if(data.text().trim() == "OK"){
				webix.message("Login success", "success");
				ui.show("/dashboard");
			}
			else{
				webix.message("Login fail","error")
			}
		});
	}
}
export default class PersonView extends JetView {
	config(){
		const main_info = {
			margin:10,
			rows:[
				{
					view:"text", name:"email",
					label:"Email", labelPosition:"top",
					invalidMessage:"Email required",
                },
                {
					view:"text", name:"pass",
                    label:"Password", labelPosition:"top",
                    type:"password",
					invalidMessage:"Password required"
                },
			]
		};
		const buttons = {
			margin:10,
			cols:[
				{},
				{
					view:"button", value:"Register", autowidth:true,
					click:() => {this.show("/register");}
				},
				{
					view:"button", value:"Login", type:"form", autowidth:true,
					tooltip:"Save changes",
					click:() => login(this.$$("form"),this)
				},
				{}
			]
		};
		return { rows: [ {}, { cols:[ {}, {
            width:500,
            height: 300,
            type:"space",
			rows:[
				{ template:"Login", type:"header" },
				{
					view:"form", localId:"form", padding:24,
					rows:[
                        main_info,
						buttons
					],
					rules:{
                        "email":webix.rules.isNotEmpty,
                        "pass": webix.rules.isNotEmpty
					}
				}
			]
		}, {}]}, {} ] };
	}
	init(){
		
	}
}