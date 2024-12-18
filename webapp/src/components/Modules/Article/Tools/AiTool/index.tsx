import Ui from "./ui";
import FetchData from "./fetchData";
class AskAiTool {
  static get toolbox() {
    return {
      title: "Ask GPT",
      icon:
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<svg width="800px" height="800px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M822.431 296.172c-3.469 36.542-6.416 82.255-15.612 118.355-17.246 67.718-37.5 82.61-93.818 84.015-38.805 0.968-74.218-95.471-72.953-220.768 0.833-82.372 50.497-178.063 54.715-202.37-68.419-1.181-198.916 18.234-270.479 149.873-70.659 129.97-58.109 270.825-94.286 273.265-42.58 2.872-87.903-71.043-72.953-147.179 15.084-76.812 18.64-82.934 36.477-110.384-99.337 38.149-143.654 113.724-145.906 202.372v147.177c0 203.211 163.311 367.947 364.766 367.947s364.766-164.736 364.766-367.947V443.351c-0.002-75.049-27.039-124.556-54.717-147.179z m18.238 185.506v125.716c0 173.575-146.979 314.286-328.289 314.286S184.091 780.969 184.091 607.394V481.678c-1.952-91.593 21.231-152.244 56.717-179.997-20.653 43.052-29.035 94.357-17.474 133.71 16.798 57.182 45.169 98.061 106.663 99.946 62.696 1.922 62.73-72.698 109.43-220.768 43.822-138.947 149.873-202.804 200.621-202.37-3.795 20.763-43.812 107.498-36.477 220.768 6.917 106.809 46.047 197.523 109.43 202.37 59.328 4.536 84.775-27.371 101.53-52.927 18.584-28.344 27.667-108.731 27.667-108.731s-0.959 74.94-1.529 107.999z" fill="#5B4FE9" /></svg>',
    };
  }

  constructor({ data, config, api, readOnly }) {
    this.api = api;
    this.config = {
      actions: config.actions || [],
      uploader: config.uploader || undefined,
    };
    this.isPremium = true;
    this.startStream = this.startStream.bind(this);
    this.ui = new Ui({
      api,
      config,
      onSubmit: (reqQuery) => {
        this.fetchData.fetchSelectedInput(reqQuery);
      },
      readOnly,
    });
    this.fetchData = new FetchData({
      config,
      onSuccess: (res) => this.onSuccess(res),
    });

    this._data = {};
    this.data = data;
  }

  appendCallback() {
    let actionData = this.config.actions;
    const { getUserData, showModalForBuyNow, openAskAiTool, getData } =
      actionData;
    const userData = getUserData();
    const isPremium = userData.profileState !== "IS_PREMIUM";
    this.isPremium = isPremium;
    if (!isPremium) {
      showModalForBuyNow();
    }
    // this.ui.nodes.fileButton.click();
  }

  render() {
    return this.ui.render(this.data);
  }

  startStream(resData) {
    this.ui.startStream(resData);
  }

  save() {
    return this.data;
  }
  validate(savedData) {
    return savedData.completion && savedData;
  }
  onSuccess(res) {
    if (res) {
      this.toolData = this.data.completion + res;
    } else {
      console.log("bad response", res);
      //
      //this.uploadingFailed("incorrect response: " + JSON.stringify(res));
    }
  }

  get data() {
    return this._data;
  }

  set data(data) {
    // this.image = data.file;
    this.toolData = data.completion || "";
    // this._data.caption = data.caption || '';
    // this.ui.fillCaption(this._data.caption);

    // ImageTool.tunes.forEach(({ name: tune }) => {
    //   const value = typeof data[tune] !== 'undefined' ? data[tune] === true || data[tune] === 'true' : false;

    //   this.setTune(tune, value);
    // });
  }

  set toolData(completion) {
    this._data.completion = completion;
    if (completion) {
      this.ui.startStream(completion);
    }
  }

  // validate(savedData) {
  //   console.log("validate getting called", savedData);
  //   // if (!savedData.url.trim()) {
  //   //   return false;
  //   // }

  //   return false;
  // }
}

export default AskAiTool;
