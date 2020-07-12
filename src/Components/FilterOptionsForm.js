import React from 'react';
import Form from 'react-bootstrap/Form';


const FilterOptionsForm = (props) => {
    const option = props.option

    return(
        <div>
            <Form>
                <div className="mb-3">
                    <Form.Check
                        type='checkbox'
                        label={`${option.color} (${option.amount})`}
                        onChange={() => props.checkFilter(option)}
                    />
                </div>
            </Form>
        </div>
    )
}

export default FilterOptionsForm