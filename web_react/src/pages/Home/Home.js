import { useState, useEffect } from 'react';
import TimeButtons from '../../components/TimeButtons/TimeButtons';
import api from '../../utils/Api';
import TableTimes from '../../components/TableTimes/TableTimes';
import { Link } from 'react-router-dom';

const Home = () => {
    const [items, setItems] = useState([]);
    const handleButtonId = (id) => {
        if (id) {
            sendCommandToServer(id);
        }
    };

    useEffect(
        () => async () => {
            const res = await api.getItems();
            setItems(res.data);
        },
        [],
    );

    handleButtonId();

    const sendCommandToServer = async (command) => {
        const res = await fetch('http://127.0.0.1:5000/calculator', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(command),
        });
        if (res.status !== 200) {
            console.log('Error');
        } else {
            const result = await res.json();
            setItems(result);
        }
    };

    return (
        <>
            <Link to="/"><button className="button_back">Back</button></Link>
            <div className="wrapper clear">
                <h1 className='home_title'>Calculator</h1>
                <div>
                    <TimeButtons
                        buttonId={['7', '8', '9', 'A']}
                        handleButtonId={handleButtonId}
                        buttonLabels={['7', '8', '9', '/']}
                    />
                </div>
                <div>
                    <TimeButtons
                        buttonId={['4', '5', '6', 'B']}
                        handleButtonId={handleButtonId}
                        buttonLabels={['4', '5', '6', '*']}
                    />
                </div>
                <div>
                    <TimeButtons
                        buttonId={['1', '2', '3', 'C']}
                        handleButtonId={handleButtonId}
                        buttonLabels={['1', '2', '3', '-']}
                    />
                </div>
                <div>
                    <TimeButtons
                        buttonId={['0', 'button_clear', 'D', 'button_equals']}
                        handleButtonId={handleButtonId}
                        buttonLabels={['0', 'c', '+', '=']}
                    />
                </div>
                <div className='table_db'>
                    <TableTimes items={items} />
                </div>
            </div>
        </>
    );
};

export default Home;
