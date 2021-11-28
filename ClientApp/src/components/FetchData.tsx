import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as DataStore from '../store/Data';
import useToken from '../helper/token-helper';

// At runtime, Redux will merge together...
type DataProps =
    DataStore.DataState // ... state we've requested from the Redux store
    & typeof DataStore.actionCreators;

const FetchData = (props: DataProps) => {
    const { token } = useToken();

    React.useEffect(() => {
        props.requestData(token);
    }, [])

    return (
        <React.Fragment>
            <h1 id="tabelLabel">Registered Users</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data && props.data.map((data: DataStore.Data) =>
                        <tr key={data.username}>
                            <td>{data.id}</td>
                            <td>{data.firstName}</td>
                            <td>{data.lastName}</td>
                            <td>{data.username}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </React.Fragment>
    );
}

export default connect(
    (state: ApplicationState) => state.data, // Selects which state properties are merged into the component's props
    DataStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchData as any);
