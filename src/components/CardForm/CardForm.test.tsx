import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'; 
import { CardForm, InitialValues } from './CardForm';

it('rendering and submitting form', async () => {
    const handleSubmit = jest.fn();
    const onFormSubmit = (values: InitialValues) => {
        handleSubmit(values);
    }

    render(<CardForm onFormSubmit={onFormSubmit}/>);

    userEvent.type(screen.getByLabelText('Card Number'), '1234567891234567');
    userEvent.type(screen.getByLabelText('Card Holders'), 'Holders Name');
    userEvent.selectOptions(screen.getByLabelText('MM'), ['09']);
    userEvent.selectOptions(screen.getByLabelText('YY'), ['2021']);
    userEvent.type(screen.getByLabelText('CVV'), '123');

    userEvent.click(screen.getByRole('button', {name: 'Submit'}));
    
    await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith({
            cardNumber: '1234567891234567',
            cardHolders: 'Holders Name',
            month: '09',
            year: '2021',
            cvv: '123'
        })
    })
})