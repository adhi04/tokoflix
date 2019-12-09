import React, { Component } from 'react'
import axios from 'axios'
// import logofooter from '../assets/img/logowhite.png';
// import {isEmpty} from 'lodash';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import {
    Badge,
    Button,
    Container,
    Col,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap' 
import { FaArrowLeft } from 'react-icons/fa';
import Footer from '../components/Footer';
import { getCash, buyMovie } from "../redux/actions/itemActions";


class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 100000,
            moviedetails : [],
            buy: 'BUY',
            watch: "WATCH NOW",
            status : 'Owned',
            movtitle: '',
            movduration: '',
            movoverview: '',
            movposter: '',
            movrating : '',
            movbackdrop : '',
            movprice:'',
            movgenre:'',
            genre: '',
            genrenum: '',
            movId: this.props.location.state.movieid
        }

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount(){
        this.props.getCash()
        var idmovie = this.props.location.state.movieid
        axios.get(`https://api.themoviedb.org/3/movie/${idmovie}?api_key=f5f360711bd7e556e473f6c1962c0fc6`)
        .then((getdata) => {
            var getmoviedetail = getdata.data
            var rating = getdata.data.vote_average
            var price =0;
                if(rating >= 0 && rating <=3){
                    price = 3500 
                }else if (rating > 3 && rating <= 6){
                    price = 8250
                }else if (rating > 6 && rating <= 8){
                    price = 16350
                }else if (rating > 8 && rating <= 0){
                    price = 21250
                }

            var ratingmov = rating;
                if (rating === 0){
                ratingmov = 'Not Rated'
                } else {
                ratingmov = rating
                }
            
            this.setState({
                movtitle: getmoviedetail.title,
                movduration: getmoviedetail.runtime,
                movposter: getmoviedetail.poster_path,
                movbackdrop: getmoviedetail.backdrop_path,
                movoverview: getmoviedetail.overview,
                movrating: ratingmov,
                movrelease: getmoviedetail.release_date,
                movgenre: getmoviedetail.genres[0].name,
                movprice: price,
            })
        })
    }
  
    toggle() {
      this.setState({
        modal: !this.state.modal,
      });
    }

    buy = () => {
        this.setState({ 
            modal: !this.state.modal,
        })

        let data = {
            cash: this.props.item.cash - this.state.movprice,
            items: this.state.movId
        } 
        this.props.buyMovie(data)
    }

    buttonBuyMovie = () => {
        return(
            <Col className="movieprice2">
                <b><h6>{this.state.movprice}</h6></b><br/>
                <Button color="warning" onClick={this.toggle}>{this.state.buy}</Button>
                {/* Modal */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Purchase Confirmation</ModalHeader>
                <ModalBody>
                    <h5><b>Title: {this.state.movtitle}</b></h5>
                    <b><p>Price Rp.{this.state.movprice}</p></b>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.buy}>Confirm</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
            </Col>
        )
    }

    buttonOwnedMovie = () => {
        return (
            <Col className="movieprice2">
                <b><h6>Owned</h6></b><br/>
                <Button color="warning" onClick={this.toggle}>WATCH NOW</Button>
            </Col>
        )
    }

  render() {
      const {cash, items} = this.props.item
      let displayButton = items.findIndex(data => data === this.props.location.state.movieid)!==-1?this.buttonOwnedMovie():this.buttonBuyMovie();
      
    return (
      <div>
        <Container style={{marginTop: 70}}>
            <Col md={3} style={{marginTop: 10}}><Link to="/"><p color="warning"><FaArrowLeft/> Back to Movie List</p></Link></Col>
            <Row>
                <Col md={4}><img src={'https://image.tmdb.org/t/p/w300' + this.state.movposter} alt='imgposter' /></Col>
                <Col md={6}>
                    <h2>{this.state.movtitle}</h2>
                    <div className="fmini">
                        <p><b>Rating: </b> {this.state.movrating}</p>
                        <p><b>Genre: </b> {this.state.movgenre}</p>
                        <p><b>Release Date: </b> {this.state.movrelease}</p>
                        <p><b>Duration: </b> {this.state.movduration} Minutes</p>
                        <p>{this.state.movoverview}</p>
                        <Row style={{marginTop:50}}>
                            {displayButton}
                        </Row>
                    </div>
                </Col>
                <Col md={2} className="fmini2">
                    <p>Your Balance: <Badge color="warning">{cash}</Badge></p>
                </Col>
            </Row>
            <Footer/>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    item: state.item
})
export default connect(mapStateToProps,{ getCash, buyMovie })(MovieDetail);