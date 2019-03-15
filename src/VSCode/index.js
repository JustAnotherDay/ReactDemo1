import * as React from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// import * as editor from 'monaco-editor/esm/vs/editor/editor.main';
import { StaticServices } from 'monaco-editor/esm/vs/editor/standalone/browser/standaloneServices';

const codeEditorService = StaticServices.codeEditorService.get();

export class MonacoEditor extends React.PureComponent {
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
    // const override = {
    //   codeEditorService: Object.assign(Object.create(codeEditorService), {
    //     openCodeEditor: async ({ resource, options }, editor) => {
    //       // Open the file with this path
    //       // This should set the model with the path and value
    //       // Move cursor to the desired position
    //       editor.setSelection(options.selection);
    //       // Scroll the editor to bring the desired line into focus
    //       editor.revealLine(options.selection.startLineNumber);
    //       return {
    //         getControl: () => editor
    //       };
    //     }
    //   }),
    // };

    this.editor = monaco.editor.create(
      this.containerElement.current,
      options
      // override
    );

    monaco.editor.setTheme('vs-dark');
    codeEditorService.openCodeEditor();
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
        style={{
          width: '100%',
          height: 500,
          display: 'flex',
          flex: 1,
          overflow: 'hidden'
        }}
        ref={this.containerElement}
      />
    );
  }
}
