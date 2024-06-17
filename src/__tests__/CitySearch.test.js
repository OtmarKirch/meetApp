import {render} from '@testing-library/react';
import CitySearch from '../components/CitySearch';

describe("<CitySearch /> component", ()=>{
    test("shows cities matching string", ()=>{
        const view = render(<CitySearch />);
        const cityTextBox = view.queryByRole("textbox");
        
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass("city");
    })
})