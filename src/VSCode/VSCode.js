import * as React from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// import * as editor from 'monaco-editor/esm/vs/editor/editor.main';

class MonacoEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.containerElement = React.createRef();
  }

  componentDidMount() {
    const { value, language } = this.props;
    const uri = `rid://gourp/:gid/members/:mid/resource/databases/dbName`;
    const model = monaco.editor.createModel(value, language, uri);

    // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
    const options = {
      value: '',
      language: 'sql',
      glyphMargin: true,
      automaticLayout: true, // auto resize
      minimap: { enabled: false }
    };

    // https://github.com/Microsoft/vscode/tree/master/src/vs/editor/browser/services
    // https://github.com/Microsoft/monaco-editor/issues/852#issuecomment-425500673
    // import { StaticServices } from 'monaco-editor/esm/vs/editor/standalone/browser/standaloneServices';
    const override = {};

    this.editor = monaco.editor.create(
      this.containerElement.current,
      options,
      override
    );
  }

  //   initEditor(container) {
  //     const context = this.props.context || window;
  //   }

  appendText(value) {
    const model = this.editor.getModel();
    // model.pushEditOperations support undo stack
    // model.setValueeditor.executeEdits not
    model.pushEditOperations(
      [],
      [
        {
          range: model.getFullModelRange(),
          text: value
        }
      ]
    );
    this.editor.focus();
  }

  render() {
    return (
      <div
        style={{ width: '100%', height: '100%' }}
        ref={this.containerElement}
      />
    );
  }
}
