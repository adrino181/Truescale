/**
 * @ScaleEditor for Rich Text and documents
 * @author adrino181
 * @version 0.0.1
 */
"use strict";
import helper, { log } from "./helper"



type EditorArgType = {
  id: String,
}
type InitArgs = EditorArgType;

/**
 * @class Editor 
 *
 * */
class ScaleEditor {
  _id;

  constructor(args: EditorArgType) {
    // this.init(args);
    let { id } = args;
    this._id = id;
    this.initCss = this.initCss.bind(this);
  }

  init() {
    let defaultSheet = this.initCss();
    // const sheet = new CSSStyleSheet();
    // sheet.replaceSync("span { color: red; border: 2px dotted black;}");
    // return sheet;
    let host = document.querySelector(`#${this._id}`);
    if (!host) {
      this.renderError('no host found')
      return;
    }
    const shadow = host.attachShadow({ mode: "open" });
    // shadow.adoptedStyleSheets = [defaultSheet];
    const span = document.createElement("span");
    span.textContent = "I'm in the shadow DOM";
    shadow.appendChild(span);
    log('this is the id', this._id);
    //get the ref of element
    //initialise all properties of editor
    // editor will have features to write
    // editor  will have feature to extend plugins
    // editor will have features to avoid injection of code
  }
  renderError(arg: any) {
    console.log('error in rendering', arg);
  }
  render() {

  }
  validate() {

  }
  resetState() {

  }
  getState() {

  }

  setState() {

  }
  initCss() {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync("span { color: red; border: 2px dotted black;}");
    return sheet;
  };
  syncCss() {

  }
}

export default ScaleEditor;
