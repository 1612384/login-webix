import {JetView} from "webix-jet";
function signin(form,ui){
	if (form.validate()){
		var values = form.getValues();
		webix.ajax().get("http://localhost:3000/email", values.email).then(function(data){
			if(data.text()!="null"){
				webix.message("Email existed", "error");
			}
			else{
				if(values.pass == values.repass){
					webix.ajax().post("http://localhost:3000/user", values);
					webix.message("Saved user!", "success");
					ui.show("/login")
				}else{
					webix.message("Pass and re-pass not match", "error");
				}
			}
		});			
	}
}
export default class RegisterView extends JetView {
	config(){
		const main_info = {
			margin:10,
			rows:[
				{
					view:"text", name:"username",
					label:"User name", labelPosition:"top",
					invalidMessage:"A name is required"
				},
				{
					view:"text", name:"email",
					label:"Email", labelPosition:"top",
					invalidMessage:"Email is in valid"
                },
                {
					view:"text", name:"pass",
                    label:"Password", labelPosition:"top",
                    type:"password",
					invalidMessage:"Password required"
                },
                {
					view:"text", name:"repass",
                    label:"Re-Password", labelPosition:"top",
                    type:"password",
					invalidMessage:"Re-pass required"
				},
			]
		};
		const buttons = {
			margin:10,
			cols:[
				{},
				{
					view:"button",id:"save", value:"Save", type:"form", autowidth:true,
					click:() => signin(this.$$("form"),this)
				},
                {}
			]
		};
        
		return { rows: [ {}, { cols:[ {}, {
            width:500,
            height: 550,
            type:"space",
			rows:[
				{ template:"Register", type:"header" },
				{
					view:"form", localId:"form", padding:24,
					height: 450,
					rows:[
						main_info,
						buttons
					],
					rules:{
                        "username":webix.rules.isNotEmpty,
                        "email":webix.rules.isEmail,
                        "pass": webix.rules.isNotEmpty,
                        "repass": webix.rules.isNotEmpty
					}
				}
			]
		}, {}]}, {} ] };
	}
	init(){
		
	}
}