import React from 'react';
import { AutoAffix } from 'react-overlays';

export const Welcome = () => {
  return (
    <AutoAffix viewportOffsetTop={50} container={this}>
      <div className="panel element-base">
        <h3>Welcome!</h3>
        <p>
          If you're here, you're probably reading or heard about <a href="https://www.manning.com/books/react-in-action" target="_blank" rel="noopener noreferrer">React in Action</a> by, well,
          me (@markthethomas everywhere). This app, Letters Social, is built with <a rel="noopener noreferrer" href="https://facebook.github.io/react/">React</a> what you'll be building in the book. It explores compoennts, React fundamentals, and If you have any questions
          or thoughts, feel free to reach out to me <a href="https://twitter.com/markthethomas" target="_blank" rel="noopener noreferrer">@markthethomas</a> pretty much anywhere.
          <br />
          <br />
          - Mark
        </p>
      </div>
    </AutoAffix>
  );
};
