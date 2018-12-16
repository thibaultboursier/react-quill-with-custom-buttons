import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import tag2content from 'tag2content';

function customButtonHandler() {
  const { index } = this.quill.getSelection();

  this.quill.insertText(index, '[customButton url="http://www.google.fr"]')
}

const modules = {
  toolbar: {
    container: [
      [
        'bold',
        'italic',
        'underline',
        'strike',
      ],
      ['clean'],
      ['custom-button'],
    ],
    handlers: {
      'custom-button': customButtonHandler,
    },
  },
};

export default class Editor extends Component {
  state = {
    text: '',
  };

  render() {
    return <ReactQuill
      modules={modules}
      onChange={this.onChange}
      value={this.state.text}
    />
  }

  onChange = text => {
    const updatedText = tag2content({
      tags: {
        'customButton': ({ url }) => `<a href="${url}">Test</a>`,
      },
      baseContent: text,
    });

    this.setState({
      text: updatedText,
    })
  }
}

