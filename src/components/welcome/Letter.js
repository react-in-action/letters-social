import React, { PropTypes } from 'react';
import moment from 'moment';
import Logo from '../nav/logo';
import TypeWriter from 'react-typewriter';

const Letter = (props) => {
  return (
    props.show ?
      <div className="letter">
        <TypeWriter typing={4}>
          <Logo />
          <span>---------------</span>
          <p>
            Engineering
          </p>
          <p>
            TechTown, Anywhere
          </p>

          <p>
            {moment().format('dddd, MMMM Do YYYY, h:mm a')}
          </p>

          <p>
            Hello!
          </p>

          <p>
            Welcome to Letters! As a new employee, you're going to be working with the latest
            and greatest technologies as you learn the ropes of our company. We were very
            impressed with your comment box project and are going to get you set up on a
            new project: Letters Social™. Letters Social™ is a groundbreaking new social experience.
            You can comment, you can post; it's like nothing you've ever seen before.
          </p>

          <p>
            For this project, you'll be using React. React, you might remember, is a hot new
            technology for building user interfaces. You've been learning about it and at
            this point you can take advantage of what you know about data in React, parent
            and child components, JSX, and now lifecycle methods. You can find the source code for this app at <a href="https://github.com/react-in-action/letters-social">github.com/react-in-action/letters-social</a>
          </p>

          <p>
            When you're done, your project should satisfy the following requirements:
          </p>

          <p>
            Requirements:
          </p>
          <ul>
            <li>
              ✅ display posts and comments from the Letters Social™ API
            </li>
            <li>
              ✅ create new posts for the Letters Social™ API
            </li>
            <li>
              ✅ each post should have display likes, comments, and crawled links if available
            </li>
            <li>
              ✅ filter posts by category
            </li>
            <li>
              ✅ display metadata about a post; number of comments, likes, etc.
            </li>
            <li>
              ✅ hide and show comments
            </li>
            <li>
              ✅ update the like count for posts and comments
            </li>
          </ul>

          <p>
            Projects in future chapters will add more to the Letters Social experience, including:
          </p>

          <p>
            User profile:
          </p>
          <ul>
            <li>
              ✅ display user profile info
            </li>
            <li>
              ✅ allow users to edit their profile
            </li>
          </ul>

          <p>
            Search box typeahead:
          </p>
          <ul>
            <li>
              ✅ allow users to search posts and comments
            </li>
            <li>
              ✅ display search results in-line
            </li>
            <li>
              ✅ display search results in a separate page
            </li>
          </ul>

          <p>
            User signup, login, and account management:
          </p>
          <ul>
            <li>
              ✅ allow users to sign up
            </li>
            <li>
              ✅ allow users to log in
            </li>
            <li>
              ✅ allow users to manage their settings
            </li>
          </ul>

          <p>Best,</p>

          <p>
            The Letters team
          </p>
        </TypeWriter>
      </div>
    :
    null

  );
};

Letter.propTypes = {
  show: PropTypes.bool,
};

Letter.defaultProps = {
  show: false,
};

export default Letter;
