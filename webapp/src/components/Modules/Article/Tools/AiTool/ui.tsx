import { make } from "./utils";

class Ui {
  constructor({ api, config, onSubmit, readOnly }) {
    this.api = api;
    this.config = config;
    this.onSubmit = onSubmit;
    this.readOnly = readOnly;
    this.nodes = {
      wrapper: make("div", [this.CSS.wrapper, this.CSS.baseClass]),
      aiToolTextBox: this.createAiToolTextBox(),
      renderEl: undefined,
      loader: make("div", this.CSS.aiToolLoader),
    };
    /*
        --- Tree structure ---
        <Wrapper>
          <AiTextBox>
            <Button>
          </AiTextBox>
          <Loader />
        </Wrapper>
      */

    this.nodes.wrapper.appendChild(this.nodes.loader);
    this.nodes.wrapper.appendChild(this.nodes.aiToolTextBox);
  }

  static get status() {
    return {
      EMPTY: "empty",
      UPLOADING: "loading",
      FILLED: "filled",
    };
  }

  get CSS() {
    return {
      baseClass: this.api.styles.block,
      loading: this.api.styles.loader,
      input: this.api.styles.input,
      button: this.api.styles.button,
      wrapperParagraph: "ce-paragraph",
      /**
       * Tool's classes
       */
      wrapper: "ai-tool-wrapper",
      aiToolContainer: "ai-tool__container",
      aiToolLoader: "ai-tool__container-preloader",
      renderEl: "ai-tool__renderEl",
    };
  }

  render(toolData) {
    if (
      !toolData ||
      !toolData.completion ||
      Object.keys(toolData).length === 0
    ) {
      this.toggleStatus(Ui.status.EMPTY);
    } else {
      this.toggleStatus(Ui.status.UPLOADING);
    }

    return this.nodes.wrapper;
  }

  toggleStatus(status) {
    for (const statusType in Ui.status) {
      if (Object.prototype.hasOwnProperty.call(Ui.status, statusType)) {
        this.nodes.wrapper.classList.toggle(
          `${this.CSS.wrapper}--${Ui.status[statusType]}`,
          status === Ui.status[statusType]
        );
      }
    }
  }

  renderSavedData() {}

  showLoader() {}

  hideLoader() {}

  createAiToolTextBox() {
    const wrapper = make("div", [this.CSS.aiToolContainer]);
    const textArea = document.createElement("input");
    textArea.placeholder = "Hi, How can i help you ?";
    wrapper.appendChild(textArea);
    const button = make("div", [this.CSS.button]);

    button.innerHTML =
      this.config.buttonContent || ` ${this.api.i18n.t("Submit")}`;

    button.addEventListener("click", () => {
      this.toggleStatus(Ui.status.UPLOADING);
      this.onSubmit(textArea.value, this.startStream);
    });
    wrapper.append(button);
    return wrapper;
  }

  fillDataInEditor(resData) {
    this.toggleStatus(Ui.status.FILLED);
    this.nodes.renderEl = make("p", this.CSS.renderEl);
    this.nodes.wrapper.contentEditable = true;
    this.nodes.renderEl.innerHTML = resData;
    this.nodes.wrapper.appendChild(this.nodes.renderEl);
  }

  startStream(data) {
    this.toggleStatus(Ui.status.FILLED);
    if (!this.nodes.renderEl) {
      this.nodes.renderEl = make("p", this.CSS.renderEl);
      this.nodes.renderEl.innerHTML = data;
      this.nodes.wrapper.appendChild(this.nodes.renderEl);
    }
    this.nodes.renderEl.innerHTML = data;
  }
}

export default Ui;
