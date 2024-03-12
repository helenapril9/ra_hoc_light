import './App.css';
import React from 'react';

function New(props) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  )
};

function Popular(props) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  )
};

function Article(props) {
  return (
    <div className="item item-article" key={props.id}>
      <h3><a href="/#">{props.title}</a></h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  )
};

function Video(props) {
  return (
    <div className="item item-video" key={props.id}>
      <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen title={props.views}></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  )
};

const Log = function (Component) {
  return class extends React.Component {
    render() {
      if (this.props.views >= 1000) return (
        <Popular>
          <Component {...this.props} />
        </Popular>
      )
      if (this.props.views < 100) return (
        <New>
          <Component {...this.props} />
        </New>
      )
      return <Component {...this.props} />
    }
  }
}

const LogVideo = Log(Video);
const LogArticle = Log(Article)

function List(props) {
  return props.list.map(item => {
    switch (item.type) {
      case 'video':
        return (
          <LogVideo {...item} />
        );

      case 'article':
        return (
          <LogArticle {...item} />
        );
      default:
        return ''
    }

  });
};

export default function App() {
  const list = [
    {
        type: 'video',
        url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
        views: 50
    },
    {
        type: 'video',
        url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
        views: 12
    },
    {
        type: 'article',
        title: 'Невероятные события в неизвестном поселке...',
        views: 175
    },
    {
        type: 'article',
        title: 'Секретные данные были раскрыты!',
        views: 1532
    },
    {
        type: 'video',
        url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
        views: 4253
    },
    {
        type: 'article',
        title: 'Кот Бегемот обладает невероятной...',
        views: 12,
    },    
  ];

  return (
    <List list={list} />
  );
}

