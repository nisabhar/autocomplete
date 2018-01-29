
export default class DomHelper {

	static createScript(id, data) {
		const script   = document.createElement("script");
		script.type  = "text/html";
		script.text  = data;
		script.id = id;
		return script;
	}
}