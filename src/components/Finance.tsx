import Header from './Header';
import SectionBreak from './SectionBreak';
import Calculator from './Calculator';
import '../styles/Finance.css';

function Finance() {
  return (
    <div>
      <Header />
      <SectionBreak />
      <div className='SectionHeader'>CALCULATORS</div>
      <Calculator />
      <div className={'PaddingAboveFooter'} />
    </div>
  );
}

export default Finance;
