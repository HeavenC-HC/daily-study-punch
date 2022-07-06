import { cloneElement, Component } from 'react';
import FieldContext from './FieldContext';

export default class Field extends Component {
  static contextType = FieldContext;

  getControlled = () => {
    console.info(this.context)
    const {getFieldValue, setFieldsValue} = this.context;
    const {name} = this.props;
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newValue = e.target.value;
        setFieldsValue({
          [name]: newValue
        })
        console.info('newValue', newValue)
      }
    }
  }
  render() {
    const {children} = this.props;
    const returnChildren = cloneElement(children, this.getControlled())
    return returnChildren;
  }
}
