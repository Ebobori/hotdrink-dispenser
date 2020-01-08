import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './style.css';
import axios from 'axios';




const products = ['tea', 'coffee', 'milk', 'sugar'];
const messages = ['Make a selection', 'You have selected a cup of' , 'You can add milk and sugar or continue' , 'with milk', 'with sugar', 'with milk and sugar', ''];
const messages2 = 'Your _ is getting prepared';
const messages3 = 'Your _ is ready';
const machine_id = 123;
const timestamp = Date.now(); // This would be the timestamp you want to format;
// const messagebox2;

console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp));
console.log(timestamp);



class Dispense extends Component {
    constructor(props) {
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.handleGoBackVisibility = this.handleToggleVisibility.bind(this);
        this.handleDespensing = this.handleDespensing.bind(this);
        this.handleBackToStart = this.handleBackToStart.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleMaintainanceToggle = this.handleMaintainanceToggle.bind(this);
        this.state = {

          products,
          stock:'',
          machine_id,
          timestamp,
          temperature: 0,
          screen2visibility: false,
          //Screen 1 visble 
          Screen2disability: true,
          Screen1Value: '',
          vosibility: true,
          vosability: false,
          dispensingScreen:false,
          dispensingCompleteScreen:false,
          isChecked: false,
          persons: [],
          items:[],
          isLoaded:false,

          temperatereading:'',
          date: new Date().toDateString(),
          time: new Date().toLocaleTimeString(),

          messages,
          messages2,
          messages3,
          messagebox: messages[0],
          messagebox2: '',
          messagebox3: '',
          temps:[],

          maintainanceScreen:false
        

        }
      }

      getPosts() {
        axios
          // This is where the data is hosted
          .get("http://localhost:4000/temps")
          // Once we get a response and store data, let's change the loading state
          .then(response => {
              console.log(`get ${response}`)
            this.setState({
              temps: response.data.temps,
              isLoading: false
            });
          })
          // If we catch any errors connecting, let's update accordingly
          .catch(error => this.setState({ error, isLoading: false }));
      }

      componentDidMount() {

        // axios.get(`https://jsonplaceholder.typicode.com/posts`)
        axios.get(`http://localhost:3000/stock`)
        .then(response => {
            console.log(response);
          this.setState({ items: response.data });
        })
       .catch(error =>{
           console.log(error)
            this.setState({errorMsg: 'Error retrieving data'})
       });

       this.intervalID = setInterval(
        () => this.tick(),
        1000
      );

      this.intervalIDDate = setInterval(
        () => this.daterefresh(),
        1000
      );

      this.intervalIDTemp = setInterval(
        () => this.refreshTemp(),
        60000
      );
    
        fetch('http://localhost:4000/temps')
        .then(res => res.json())
        .then(json =>{
            this.setState({
                isLoaded:true,
                temps:json
            })
        })

        this.getPosts();

      };

      componentWillUnmount() {
        clearInterval(this.intervalID);
        clearInterval(this.intervalIDDate);
        clearInterval(this.intervalIDTemp);
      }

      tick() {
        this.setState({
          time: new Date().toLocaleTimeString()
        });
      }

      daterefresh() {
          this.setState({
             date: new Date().toDateString()
            // date: new Date().toDateString('en-GB', {
            //     weekday: 'long',
            //     day : 'numeric',
            //     month : 'long',
            //     year : 'numeric'
            // }), 
          })
      }

      refreshTemp() {
          var min = 90.99,
            max = 99.99,
            highlightedNumber = Math.random() * (max - min) + min;
            highlightedNumber = highlightedNumber.toFixed(1);
            this.setState((prevState) => {
            return {
                temperature: highlightedNumber,
                timestamp:timestamp
            } ;
            });
            console.log( timestamp );
      }
      handleMaintainanceToggle () {
        this.setState((prevState) => {
          return {
            maintainanceScreen: !prevState.maintainanceScreen,
          };
        });
    }

      handleToggleVisibility(e) {
        this.setState((prevState) => {
          return {
            screen2visibility: !prevState.screen2visibility,
          };
        });
        this.setState((prevState) => {
            return {
              Screen2disability: !prevState.screen2visibility,
            };
          });
        //   console.log(`one cup of ${e.target.value}`); 
          var screen1val  = e.target.value;
          console.log(screen1val);

          this.setState((prevState) => {
          return{
            Screen1Value:screen1val,
            messagebox:this.state.messages[1],
            messagebox2:this.state.messages[2]
          }
        });
      }

      handleGoBackVisibility() {
        this.setState((prevState) => {
          return {
            vosibility: !prevState.screen2visibility,
            messagebox:this.state.messages[0],
            messagebox2:this.state.messages[7]

          };
        });
        this.setState((prevState) => {
            return {
              vosability: !prevState.screen2visibility,
              messagebox:this.state.messages[0],
              messagebox2:this.state.messages[7]

            };
        });
        this.setState((prevState) => {
            return{
                messagebox:this.state.messages[0],
                messagebox2:this.state.messages[7]
            }
          })
      }

      handleDespensing() {
        this.setState((prevState) => {
            return {
              screen2visibility: false,
            };
          });
          this.setState((prevState) => {
              return {
                Screen2disability: false,
              };
            });
          this.setState((prevState) => {
              return {
                dispensingScreen:!prevState.screen2visibility,
              };
            });
            setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        dispensingCompleteScreen:!prevState.screen2visibility,
                    };
                    
                  });
                  this.setState((prevState) => {
                    return {
                      dispensingScreen:false
                    };
                  });
              }, 3000);
      }

      handleBackToStart(){
                this.setState((prevState) => {
                    return {
                      Screen2disability:!prevState.screen2visibility,
                      screen2visibility: false,
                    vosibility: false,
                    vosability: false,
                    dispensingScreen:false,
                     dispensingCompleteScreen:false,
                    };
                  });
      }

      handleChecked (e) {  
        //   var txt;
       
        var vall;
            if (this.state.isChecked) {
                vall = ''
        //       txt = 'checked'
        //       //e.target.value
            } else {
                vall = e.target.value
        //       txt = 'unchecked'
            }
        //var vall = e.target.value
        // this.setState((prevState) => {
        this.setState({
            // return{
                //isChecked: !this.state.isChecked,
                messagebox3:vall

                // }
        }); 
        console.log(this.state.isChecked === true);
      }

      ChangeHandler = (e) =>{
          this.setState({[e.target.name]: e.target.value})
      }

      SubmitHandler = e => {
          e.preventDefault();
          console.log(this.state)
          axios.get(`http://localhost:4000/temps`, this.state)
          .then(response => {
            console.log(response);
            })
            .catch(error =>{
            console.log(error)
            });

      }
    render() {
        var { items , temps } = this.state;
        //console.log(items )
        // if(!isLoaded){
        //     return <div> is loading ...</div>;
        // }


        // var txt;
        // if (this.state.isChecked) {
        //   txt = 'checked'
        //   //e.target.value
        // } else {
        //   txt = 'unchecked'
        // }

        // console.log(`${txt} ${this.state}`);
        // console.log(james);

        //var txt2;
        //this.

        var {temperatereading } = this.state
        return (
            <div>
                <Container fluid={true} className="Mainscreen">
                <Row>
                    <Col md={12}>
                    
                    <br/> <br/>
                    <form onSubmit={this.SubmitHandler}>
                    {this.state.Screen2disability && (
                        <div>
                            <Button variant="primary" value="tea" onClick={this.handleToggleVisibility} size="lg" block>Tea</Button>
                            <Button variant="primary" value="coffee" onClick={this.handleToggleVisibility} size="lg" block>Coffee</Button>
                            <br/>
                            <Button variant="primary" value="coffee" onClick={this.handleMaintainanceToggle}>Maintainance</Button>
                            {/* {
                            products.length?
                            products.map( product => <Button variant="primary" size="lg" block key={postMessage.id}></Button>)
                            } */}
                        </div>
                    )}          

                    {this.state.screen2visibility && (

                        <div>
                            <ButtonToolbar>
                            <ToggleButtonGroup type="checkbox" className="sugarmilk" >
                                <ToggleButton 
                                    value="with sugar" 
                                    variant="primary" 
                                    size="lg" 
                                    className="sugar" 
                                    onChange={ this.handleChecked } 
                                    block
                                    checked={this.state.isChecked}
                                    >
                                        Sugar
                                    </ToggleButton>
                                <ToggleButton 
                                value="with milk" 
                                variant="primary" 
                                size="lg" 
                                className="milk"  
                                onChange={ this.handleChecked } 
                                checked={this.state.isChecked}
                                >
                                    Milk
                                    </ToggleButton>
                                {/* <ToggleButton value={3} variant="primary" size="lg">No Milk or Sugar</ToggleButton> */}
                            </ToggleButtonGroup>
                            </ButtonToolbar> 
                    
                        </div>
                        )}

                        {this.state.screen2visibility && (
                            <div>
                                <br/>
                                <Button variant="primary" type="submit" value={temperatereading} onClick={this.handleDespensing} size="lg" block>Dispense</Button>
                                <Button variant="primary" value={this.props.text} onClick={this.handleGoBackVisibility} size="lg" block>Back</Button>
                            </div>
                        )}
                        {this.state.dispensingScreen && (
                            <div>
                            <p className="cent">Dispensing now .....</p>
                            </div>
                        )}
                        {this.state.dispensingCompleteScreen && (
                        <div>
                            <p className="cent">Dispensing complete </p>
                            <Button variant="primary" onClick={this.handleBackToStart} size="lg" block>Get another drink</Button>
                        </div>

                        )}
                        
                        <div>
                            {/* <input 
                                type="text" 
                                name="userId" 
                                value={temperatereading} 
                                onChange={this.ChangeHandler} 
                                /> */}

                            {/* <button type="submit">Submit</button> */}
                        </div>
                        <div className="messagebox">
                        <center>  {this.state.messagebox} {this.state.Screen1Value} {this.state.messagebox3}</center>
                        </div>
                        <div>
                        <center> 
                            {this.state.messagebox2} 
                            {/* {this.state.Screen1Value} */}
                        </center> 
                        <center> The water temperature is  <br/>{this.state.temperature} &#8451;</center>
                        <p className="App-clock cent">
                         {this.state.time}  <br/> {this.state.date}
                        </p>
                        </div>
                        {this.state.maintainanceScreen && (
                        <div>
                            
                            <ul>
                            
                                {items.map(item => (
                                        <li key={item.id}>
                                        
                                             product: {item.product} | stock: {item.stock} 
                                        </li>
                                ))}
                            </ul>

                            <ul>
                                {temps.map(temp => (
                                        <li key={temp.id}>
                                            time: {temp.timestamp} | temperature: {temp.temp}
                                        </li>
                                ))}
                            </ul>
                        </div>
                        )}
                        </form>
                    </Col>
                    </Row>
                    
                    
                </Container>
                
            </div>
        );
    }
}

export default Dispense;


