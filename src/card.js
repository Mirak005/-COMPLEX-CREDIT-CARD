import React from "react";
import chip from "./chip.png";
import visa from "./visa.png";

class Card extends React.Component {
  state = {
    number: ["*", "*","*","*", " ", "*","*", "*", "*"," ", "*","*","*", "*"," ","*","*","*","*"],
    valid: ["*", "*", "/", "*", "*"],
    name: ""
  };

  //card holder name to uppercase
  cardHolder = cardHolderName => {
    cardHolderName.target.value = cardHolderName.target.value.replace(/[^a-zA-Z ]/g,"");
    this.setState({ name: cardHolderName.target.value.toUpperCase() });
  };

  //card number
  change = e => {
    //number validation
    e.target.value = e.target.value
      .replace(/[^0-9]/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    //replace the mask with input value
    this.setState({
      number: this.state.number.map((x, i) =>
        x === " "
          ? " "
          : e.target.value[i] === undefined
          ? "*"
          : e.target.value[i]
      )
    });
  };
  // valid thru
  validation = e => {
    console.log(e.target.value);
    e.target.value =
      e.target.value.length >= 3?
       `${e.target.value.replace(/[^0-9]/g, "").slice(0, 2)}/${e.target.value.replace(/[^0-9]/g, "").slice(2, 4)}`
        : e.target.value.replace(/[^0-9]/g, "");

    this.setState({
      valid: this.state.valid.map((x, i) =>
        x === "/"
          ? "/"
          : e.target.value[i] === undefined
          ? "*"
          : e.target.value[i]
      )
    });
  };

  render() {
    return (
      <div className="card-form-container">
        <div className="container">
          <h1 className="title-card">CREDIT CARD</h1>
          <img className="chip-logo" src={chip} alt="Fail to load" />
          <div className="card-informations-container">
            <div className="card-informations">
              <p className="card-number">{this.state.number}</p>
              <p className="month-year">MONTH/YEAR</p>

              <div className="card-date">
                <h4 className="code">3568</h4>

                <div className="date-valid-container">
                  <p className="valid">VALID THRU</p>
                  <p className="date">➧{this.state.valid}</p>
                </div>
              </div>
            </div>
            <img className="visa" src={visa} alt="fail to load" />
          </div>

          <h3 className="card-holder">{this.state.name}</h3>
        </div>

        <form className="form-container">
          <label>Card holder</label>
          <input
            onChange={this.cardHolder}
            maxLength="20"
            placeholder="Enter your name"
            type="text"
          />

          <label>Card number</label>
          <input
            onChange={this.change}
            maxLength="19"
            placeholder="**** **** **** ****"
          />

          <label>Valid thru</label>
          <input onChange={this.validation} 
          maxLength="5"
           placeholder="MM/YY" />
        </form>
      </div>
    );
  }
}

export default Card;
