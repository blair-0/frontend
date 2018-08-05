import React, { Component } from 'react'
import './Order.css'

import Link from 'valuelink'
import Group from './Group/Group'


const rating = {
  ETHBTC: 0.05,
  BTCETH: 17.2
}

class Order extends Component {

  state = {
    active: 'buy',
    sellAmount: '',
    buyAmount: '',
    sellCurrency: 'ETH',
    buyCurrency: 'BTC',
  }

  componentWillMount() {
    const { sellCurrency, buyCurrency } = this.state
    this.handleSetRate(sellCurrency, buyCurrency)
  }

  handleSellActive = () => {
    this.setState({
      active: 'sell',
    })
  }

  handleBuyActive = () => {
    this.setState({
      active: 'buy',
    })
  }

  handleSetRate = (sellCurrency, buyCurrency) => {
    let { buyAmount, sellAmount } = this.state

    const exchangeRate = rating[`${sellCurrency}${buyCurrency}`]

    buyAmount  = (sellAmount || 0) * exchangeRate
    sellAmount = (buyAmount || 0) / exchangeRate

    this.setState({
      exchangeRate,
      buyAmount,
      sellAmount,
    })
  }

  handleSellAmountChange = (value) => {
    const { exchangeRate } = this.state

    this.setState({
      buyAmount: value * exchangeRate,
    })
  }

  handleBuyAmountChange = (value) => {
    const { exchangeRate } = this.state

    this.setState({
      sellAmount: value / exchangeRate
    })
  }

  handleSellCurrencyChange = (value) => {
    let { sellCurrency, buyCurrency } = this.state

    if (buyCurrency === value) {
      buyCurrency = sellCurrency
    }

    this.handleSetRate(value, buyCurrency)

    this.setState({
      sellCurrency: value,
      buyCurrency,
    })
  }

  handleBuyCurrencyChange = (value) => {
    let { sellCurrency, buyCurrency } = this.state

    if (sellCurrency === value) {
      sellCurrency = buyCurrency
    }

    this.handleSetRate(sellCurrency, value)

    this.setState({
      buyCurrency: value,
      sellCurrency,
    })
  }

  render() {
    const { active } = this.state
    const linked = Link.all(this, 'buyCurrency', 'sellCurrency', 'buyAmount', 'sellAmount')

    return (
      <div className="row">
        <div>
          <button onClick={this.handleBuyActive} className={active === 'buy' ? 'btn active' : 'btn'}> buy </button>
          <button onClick={this.handleSellActive} className={active === 'sell' ? 'btn active' : 'btn'}> sell </button>
        </div>
        <Group
          linkInput={linked.sellAmount.onChange(this.handleSellAmountChange)}
          linkSelect={linked.sellCurrency.onChange(this.handleSellCurrencyChange)}
        />
        <Group
          readOnly
          linkInput={linked.buyAmount.onChange(this.handleBuyAmountChange)}
          linkSelect={linked.buyCurrency.onChange(this.handleBuyCurrencyChange)}
        />
        <button>Create order</button>
      </div>
    )
  }
}

export default Order