import React from 'react';
import { calculateCompoundGrowth, getPaymentFrequency, getContributionPercentages, adjustValueForInflation } from '../utils/financeUtils';

interface CalculatorProps { }

interface CalculatorState {
  currentAge: number,
  retirementAge: number,
  initialInvestment: number,
  investmentRate: number,
  contribution401k: number,
  contributionIRA: number,
  paymentFrequency: string | undefined,
  result: number | undefined;
  retirementAccountBalance: string | undefined;
  retirementAccountBalanceAfterInflation: string | undefined;
  savingsAccountBalance: string | undefined;
  savingsAccountBalanceAfterInflation: string | undefined;
  totalContributions: string | undefined;
}

class Calculator extends React.Component<CalculatorProps, CalculatorState> {
  fieldRef = React.createRef<HTMLInputElement>();

  constructor(props: CalculatorProps) {
    super(props);
    this.state = {
      currentAge: 23,
      retirementAge: 65,
      initialInvestment: 52000,
      investmentRate: 7,
      contribution401k: 19500,
      contributionIRA: 6000,
      paymentFrequency: 'MONTHLY',
      result: undefined,
      retirementAccountBalance: undefined,
      retirementAccountBalanceAfterInflation: undefined,
      savingsAccountBalance: undefined,
      savingsAccountBalanceAfterInflation: undefined,
      totalContributions: undefined,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  executeScroll = () => this.fieldRef.current?.scrollIntoView({ behavior: 'smooth' })

  handleInputChange(event: any) {
    const target = event.target;
    const value: string | number = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    } as Pick<CalculatorState, keyof CalculatorState>);
  }

  handleSubmit(event: any) {
    event.preventDefault();
    const annualContribution: number = Number(this.state.contribution401k) + Number(this.state.contributionIRA);
    const years = this.state.retirementAge - this.state.currentAge;
    const totalContributions = annualContribution * years;
    const retirementAccountBalance = calculateCompoundGrowth(this.state.initialInvestment, annualContribution, this.state.investmentRate / 100, getPaymentFrequency(this.state.paymentFrequency!), years);
    const savingsAccountBalance = calculateCompoundGrowth(this.state.initialInvestment, annualContribution, 0.01 / 100, getPaymentFrequency(this.state.paymentFrequency!), years);
    this.setState({ totalContributions: totalContributions.toLocaleString('en-US', { minimumIntegerDigits: 1, minimumFractionDigits: 2, maximumFractionDigits: 2 }) });
    this.setState({ retirementAccountBalance: retirementAccountBalance.toLocaleString('en-US', { minimumIntegerDigits: 1, minimumFractionDigits: 2, maximumFractionDigits: 2 }) });
    this.setState({ retirementAccountBalanceAfterInflation: adjustValueForInflation(retirementAccountBalance, years).toLocaleString('en-US', { minimumIntegerDigits: 1, minimumFractionDigits: 2, maximumFractionDigits: 2 }) });
    this.setState({ savingsAccountBalance: savingsAccountBalance.toLocaleString('en-US', { minimumIntegerDigits: 1, minimumFractionDigits: 2, maximumFractionDigits: 2 }) });
    this.setState({ savingsAccountBalanceAfterInflation: adjustValueForInflation(savingsAccountBalance, years).toLocaleString('en-US', { minimumIntegerDigits: 1, minimumFractionDigits: 2, maximumFractionDigits: 2 }) }, this.executeScroll);
  }

  render() {
    return (
      <div className={'CalculatorWrapper'}>
        <form onSubmit={this.handleSubmit}>
          <div className='QnA'>
            <div className={'Question'}>
              What is your current age?
            </div>
            <input
              className={'Answer'}
              name='currentAge'
              type='number'
              min={0}
              max={110}
              required={true}
              onChange={this.handleInputChange}
              defaultValue={23}
            />
          </div>
          <div className='QnA'>
            <div className={'Question'}>
              At what age do you plan on retiring?
            </div>
            <input
              className={'Answer'}
              name='retirementAge'
              type='number'
              min={this.state && this.state.currentAge || 0}
              max={110}
              required={true}
              onChange={this.handleInputChange}
              defaultValue={65}
            />
          </div>
          <div className='QnA'>
            <div className={'Question'}>
              How much do you currently have invested?
            </div>
            <input
              className={'Answer'}
              name='initialInvestment'
              type='number'
              min={0}
              required={true}
              onChange={this.handleInputChange}
              defaultValue={52000}
            />
          </div>
          <div className='QnA'>
            <div className={'Question'}>
              How much do you expect to contribute to your 401(k) each year?
            </div>
            <input
              className={'Answer'}
              name='contribution401k'
              type='number'
              min={0}
              max={19500}
              required={true}
              onChange={this.handleInputChange}
              defaultValue={19500}
            />
          </div>
          <div className='QnA'>
            <div className={'Question'}>
              How much do you expect to contribute to your IRAs each year?
            </div>
            <input
              className={'Answer'}
              name='contributionIRA'
              type='number'
              min={0}
              max={6000}
              required={true}
              onChange={this.handleInputChange}
              defaultValue={6000}
            />
          </div>
          <div className='QnA'>
            <div className={'Question'}>
              How often do you get paid?
            </div>
            <select className={'Answer'} name='paymentFrequency' onChange={this.handleInputChange}>
              <option value={'MONTHLY'}>Monthly</option>
              <option value={'SEMI_MONTHLY'}>Semi-Monthly</option>
              <option value={'BIWEEKLY'}>Biweekly</option>
              <option value={'WEEKLY'}>Weekly</option>
            </select>
          </div>
          <div className='QnA'>
            <div className={'Question'}>
              How much do you expect to your investments to increase year over year? (%)
            </div>
            <input
              className={'Answer'}
              name='investmentRate'
              type='number'
              min={0}
              max={100}
              required={true}
              onChange={this.handleInputChange}
              defaultValue={7}
            />
          </div>
          <div></div>
          <input
            ref={this.fieldRef}
            className={'Answer'}
            type='submit'
            value='CALCULATE'
          />
        </form >

        {this.state && this.state.retirementAccountBalance &&
          <div className={'ComputedValue'}>${this.state.retirementAccountBalance}
            <div className={'Description'}>This is the total value of your retirement accounts.</div>
          </div>
        }

        {this.state && this.state.retirementAccountBalance &&
          <div className={'ComputedValue'}>${this.state.retirementAccountBalanceAfterInflation}
            <div className={'Description'}>This is the total value of your retirement accounts, adjusted for inflation.</div>
          </div>
        }

        {this.state && this.state.totalContributions &&
          <div className={'ComputedValue'}>${this.state.totalContributions}
            <div className={'Description'}>In all, this is how much money you invested.</div>
          </div>
        }


        {this.state && this.state.savingsAccountBalance &&
          <div className={'ComputedValue'}>${this.state.savingsAccountBalance}
            <div className={'Description'}>If you chose to save your money in traditional savings accounts, this will be your balance with regular contributions.</div>
          </div>
        }

        {this.state && this.state.savingsAccountBalance &&
          <div className={'ComputedValue'}>${this.state.savingsAccountBalanceAfterInflation}
            <div className={'Description'}>This is the total value of your savings accounts, adjusted for inflation. Notice how it is lower than how much you contributed.</div>
          </div>
        }
      </div>
    );
  }
}

export default Calculator;
