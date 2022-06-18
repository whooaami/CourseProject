const TableTimes = (props) => {
    const { items } = props;
    return (
        <table className="mt-50">
            <tr>
                <th>Id</th>
                <th>Result</th>
            </tr>
            {items.map((item) => (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.example}</td>
                </tr>
            ))}
        </table>
    );
};

export default TableTimes;
