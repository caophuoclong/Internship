import React, { Component } from "react";
import JsSIP from "jssip";
var socket = new JsSIP.WebSocketInterface("wss://sbc03.tel4vn.com:7444");
var configuration = {
  sockets: [socket],
  uri: "108@2-test1.gcalls.vn:50061",
  password: "test1108",
};
const coolPhone = new JsSIP.UA(configuration);
coolPhone.start();

coolPhone.register();

class Call extends Component {
  constructor() {
    super();
    this.state = {
      sipStatus: "",
      inSession: [],
      phone: coolPhone,
      callReceived: false,
      description: '',
    };
    var audioElement = "";
  }
  endCall(){
    coolPhone.stop();
  }
  
  doCall(number) {
    const eventHandlers = { // bắt sự kiện mỗi khi thực hiện call
        'progress': (e) => {
          console.log('call is in progress')
          if(this.state.sipStatus !== 'progress')
              this.setState({sipStatus: "progress",inSession: this.state.inSession.push('progress')})
        },
        'failed': (e) => {
          console.log('call failed with cause: ', e)
              this.setState({sipStatus: "failed", description: e.cause})
        },
        'ended': (e) => {
          console.log('call ended with cause: ', e)
          this.setState({sipStatus: "ended", description: e.cause})
        },
        'confirmed': (e) => {
            console.log('confirmed: ', e)
          this.setState({sipStatus: "confirmed"})
        }
      };
    const option = { // option cho hàm call
      eventHandlers: eventHandlers,
      extraHeaders: ["X-Foo: foo", "X-Bar: bar"],
      mediaConstraints: { audio: true, video: false },
      sessionTimersExpires: 120,
    };
    
    let session = this.state.phone.call(number, option);
    session.connection.addEventListener('addstream', function (e) {
        // đặt stream audio 
        const remoteAudio = document.createElement('audio');
        remoteAudio.srcObject = e.stream;
        remoteAudio.play();
      });
}
  
  render() {
    const { value } = this.props;
    const {sipStatus, description} = this.state;
    if(sipStatus !== 'progress' && sipStatus !== 'failed' && sipStatus !== 'confirmed' && sipStatus !== 'ended'){
      return(
        <div>
          {this.doCall(value)}
        </div>
      )
    }
    else{
      return (
        <div className="call">
        <h1>{value}</h1>
        <h2>{sipStatus}</h2>
        <button onClick={this.endCall}>Endcall</button>
        </div>
          );
    
    }
    
    
  }
}

export default Call;
