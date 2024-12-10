class FetchData {
  constructor({ api, config, onSuccess }) {
    this.api = api;
    this.config = config;
    this.onSuccess = onSuccess;
  }

  async fetchSelectedInput(reqData) {
    this.config.uploader.fetchFile({
      query: reqData,
      onSuccess: (res) => this.onSuccess(res),
    });
  }
}

export default FetchData;
