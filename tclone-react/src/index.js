import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {TweetsComponent, FeedComponent, TweetDetailComponent} from "./tweets";

const appElement = document.getElementById('root');

if (appElement) {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
        appElement
    );
}

const tweetsElement = document.getElementById("tweets");
if (tweetsElement) {
    console.log(tweetsElement.dataset);
    ReactDOM.render(React.createElement(TweetsComponent, tweetsElement.dataset), tweetsElement)
}

const feedElement = document.getElementById("tweets-feed");
if (feedElement) {
    console.log(tweetsElement.dataset);
    ReactDOM.render(React.createElement(FeedComponent, feedElement.dataset), feedElement)
}

const tweetDetailElements = document.querySelectorAll(".tweets-detail");
tweetDetailElements.forEach(container=> {
    ReactDOM.render(
        React.createElement(TweetDetailComponent, container.dataset),
        container
    );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
