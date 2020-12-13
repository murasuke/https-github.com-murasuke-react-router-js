import React, {Component, useState} from 'react';
import {BrowserRouter, Route, Link} from "react-router-dom";

const App = () =>(
    <BrowserRouter>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/friends">Friends</Link></li>
            </ul>
            <hr />
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/friends" component={Friends} />
        </div>
    </BrowserRouter>
)

const Home = ()=>(
    <div>
        <h2>Home</h2>
        <p>Welcom to </p>

    </div>
);

const About =() => (
    <div>
        <h2>Abount</h2>
        <p>投票ページ</p>
    </div>
);

// const Friends = () =>(
//     <div>
//         <h2>Friends</h2>
//         <p>フレンズのリストを記載</p>
//         <Route exact path="/friends" component={FriendList} />
//         <Route path="/friends/:id" component={Friend} />
//     </div>
// );

/**
 * React hook版の実装（Componentと同じ実装をhookで再実装)
 */
const Friends = () =>{
    let counts = {};
    FRIENDS.forEach( friends =>{
        counts[friends.id] = 0
    })
    const [likeCounts, setCount] = useState(counts);
    
    const handleVote = (id) => {
        setCount( {
            ... likeCounts,
            [id]: likeCounts[id] +1,
        });
    }
    return (
        <div>
            <h2>Friends</h2>
            <p>フレンズのリストを記載</p>
            <Route exact path="/friends" render={props => <FriendList handleVote={handleVote} />} />
            <Route path="/friends/:id" render={props => <Friend match={props.match} history={props.history} votes={likeCounts} /> } />
        </div>
    );
}

// /**
//  * Componentでstate(like数)を保持する
//  */
// class Friends extends Component{
//     constructor(){
//         super();
//         this.state = {};
//         this.handleVote = this.handleVote.bind(this);
//     }

//     componentWillMount(){
//         FRIENDS.forEach(friend =>{
//             this.setState({
//                 ...this.state,
//                 [friend.id] : 0,
//             });
//         });
//     }

//     handleVote(id){
//         this.setState({
//             [id]: this.state[id] +1,
//         })
//     }

//     render(){
//         return(
//             <>
//                 <h2>Friends</h2>
//                 <Route exact path="/friends" render={props => <FriendList handleVote={this.handleVote} />} />
//                 <Route path="/friends/:id" render={props => <Friend match={props.match} history={props.history} votes={this.state} /> } />
//             </>
//         )
//     }
// }

const FriendList = (props) => (
    <ul>
        {FRIENDS.map( friend => (
            <li key={friend.id}>
                <Link to={`/friends/${friend.id}`}>{friend.nameJa}</Link>
                <button onClick={ ()=> props.handleVote(friend.id)}>+</button>
            </li>
        ))}
    </ul>
)

const Friend = props =>{
    const {id} = props.match.params;
    const friend = friendById(id);
    const vote = props.votes[id];

    if (typeof friend === "undefined"){
        return (
            <div>
                <p>Friends with id '{id}' dow not exist.</p>
            </div>
        )
    }

    const containerStyle = { border: '1px gray solid', display: 'inline-block', padding: 10 }
    const contentsStyle = { margin: 0 }
    const aStyle = {color: "blue", textDecoration: "underline solid blue"}

    return (
        <div>
            <div style={containerStyle}>
                <p style={contentsStyle}>{friend.family}</p>
                <h1 style={contentsStyle}>{friend.nameJa}</h1>
                <p style={contentsStyle}>{friend.nameEn}</p>
                <p style={contentsStyle}><a style={aStyle} onClick={() => props.history.goBack()}>戻る</a></p>
            </div>
            <h1>{vote}</h1>
        </div>
    )
}


const FRIENDS = [
    {
      id: 'serval',
      nameJa: 'サーバル',
      nameEn: 'Serval Cat',
      family: 'ネコ目ネコ科ネコ属'
    },
    {
      id: 'raccoon',
      nameJa: 'アライグマ',
      nameEn: 'Common raccoon',
      family: 'ネコ目アライグマ科アライグマ属'
    },
    {
      id: 'fennec',
      nameJa: 'フェネック',
      nameEn: 'Fennec',
      family: 'ネコ目イヌ科キツネ属'
    }
  ]

  const friendById = id => FRIENDS.find( friend => friend.id === id );

export default App;